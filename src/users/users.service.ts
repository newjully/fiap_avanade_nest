import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {

constructor(
  private prisma: PrismaService, 
  private emailService:EmailService,
) {}

async getUserById(id: string): Promise<users> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: Number(id),
      }   
    });
    if (!user) {
      throw new HttpException(
       '"Usuário não encontrado!"', HttpStatus.NOT_FOUND);
    }
    return user;
    }



//await this.verifyUserExists(email, false);
async verifyUserExists(email: string): Promise<boolean> {
  
  const user = await this.prisma.users.findUnique({
    where: {
      email: email,
    }
  });
  return user ? true : false;
}

async crypto(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }






async create(data: CreateUserDTO): Promise<users> {
  const { name, email, password } = data;
// busca para saber se o email já existe.
// findUnique é um método do prisma que busca um registro único.("se o usuário já existe"e-mail ja cadastrado traz o primeiro registro)")
// findFirst é um método do prisma que busca o primeiro registro.(se o usuário já existe"e-mail ja cadastrado compara com o primeiro registro rodando toda a tabela")

  //verificar se usuário já existe.
  const checkUser = await this.verifyUserExists(email);
  let user = undefined;

  if (!checkUser) {
    user = await this.prisma.users.create({
      data: {
        name,
        email,
        password: await this.crypto(password),
      },
    });
// enviar email
    if(
      await this.emailService.sendEmail(
      email, 
      'Bem vindo ao Sistema', 
      'Você se Cadastrou no site Fiap Avanade,',
      {},
      )
      ){
      console.log('Email enviado com sucesso!');
    }
  }

  if (!user) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        message: 'Erro ao criar usuário!',
      },
      HttpStatus.FORBIDDEN,
    );
  }
  return user;
}


    async findAll(): Promise<users[]> {
        return await this.prisma.users.findMany();
    }

    async findOne(id: number): Promise<users> {
        return await this.prisma.users.findUnique({
            where: {
                id: id,
            },
        });
    }
    async update(id: number, req: UpdateUserDTO): Promise<object> {
        const user = await this.getUserById(id.toString()); 

        const { name, email, password } = req;

// antes de alterar alguem no banco de dados, verificar se o email já existe.
      if (email) {
       const checkEmail = await this.prisma.users.findMany({
        where: {
          AND: [{ email: email }, { id: { not: Number(id) } }],
        },
      });
    
    if (checkEmail) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Email e-mail está insdisponível!',
        },
        HttpStatus.FORBIDDEN,
      );
    }
}

        const updatedUser = await this.prisma.users.update({
                where: {
                id: Number (id),
            },  
            data: {
                name: name ? name : user.name,                
                email: email? email : user.email,
                password: password ? await this.crypto(password) : user.password,
            },
        });

        if (!updatedUser) {
            throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                message: 'Erro ao atualizar usuário!',
              },
            HttpStatus.FORBIDDEN,
       );
      }
    
      return { msg: `Usuário ${updatedUser.name} atualizado com sucesso!` };
    }
  
    async remove(id: number): Promise<object> {
      const user = await this.getUserById(id.toString());

      const deletedUser = await this.prisma.users.delete({
        where: {
          id: Number(id),
        }
      });
if (!deletedUser) {
  throw new HttpException(
    {
      status: HttpStatus.FORBIDDEN,
      message: 'Erro ao deletar usuário!',
    },
    HttpStatus.FORBIDDEN,
  );
}

      return { msg: `Usuário ${user.name} deletado com sucesso!`};	
    }
  }