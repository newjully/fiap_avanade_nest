import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
constructor(private prisma: PrismaService) {}

async verifyUserExists(email: string): Promise<boolean> {
  
  const user = await this.prisma.users.findUnique({
    where: {
      email: email,
    }
  });
  return user ? true : false;
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
        password,
      },
    });
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
    async update(id: number, req: UpdateUserDTO): Promise<string> {
        return `Usuário ${id} atualizado com sucesso!`;
    }

}
