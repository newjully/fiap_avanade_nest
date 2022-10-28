import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // criar (POST) um novo usuário
    @Post()
    create(@Body() req:CreateUserDTO){
        return this.usersService.create(req);
    }

    // listar todos  (GET) localhost:3000/users
    @Get()
    findAll(){
        return this.usersService.findAll();
    }


    // listar um  (GET) localhost:3000/users/1
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: number) {
        return this.usersService.findOne(+id);
    }


    // atualizar  (PUT) ou (PATCH) localhost:3000/users/1
    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: number, 
    @Body() req:UpdateUserDTO) {
        return this.usersService.update(+id, req);
    }

    // deletar  (DELETE)




}
