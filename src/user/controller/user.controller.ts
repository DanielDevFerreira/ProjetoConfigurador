import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { tb_usuario } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/service/user.service';


@Controller('user')
// @UseGuards(AuthGuard())
export class UserController {

    constructor(private userService: UserService){}

//=====================================================

    // select * from tb_usuario
    @Get('all')
    getAllUser(): Promise<tb_usuario[]>{
        return this.userService.getAllUser();
    }

//=====================================================

    // select com where id
    @Get('/:id')
    getUserById(@Param('id') id:string): Promise<tb_usuario>{
        return this.userService.getUserById(id);
    }

//=====================================================

    // insert tb_usuario
    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto): Promise<tb_usuario>{
       console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }

//=====================================================

    @Delete('/:id')
    deleteUser(@Param('id') id:string){
        return this.userService.deleteUser(id);
    }

//=====================================================

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto): Promise<tb_usuario>{
        console.log(updateUserDto);
        return this.userService.updateUser(id, updateUserDto);
    }

  
}
