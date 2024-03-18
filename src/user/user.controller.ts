import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import User from './entities/user';
import { CreateUserDto } from './dtos/createUserDto';
import { EditUserDto } from './dtos/editUserDto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Roles('ADMIN','MODERATOR')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    async getAllUsers(): Promise<User[]> {
      const users = await this.userService.getAllUsers();
      return users;
    }
    
    @Roles('ADMIN','MODERATOR')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
      const user = await this.userService.getuserById(Number(id));
      return user;
    }
    @Roles('ADMIN','MODERATOR')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
      const newUser = await this.userService.createuser(createUserDto);
      return newUser;
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Put(':id')
    async editUser(@Param('id') id: string, @Body() editUserDto: EditUserDto) {
      const updatedUser = await this.userService.updateUser(Number(id), editUserDto);
      return updatedUser;
    }
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
      const deletedUser = await this.userService.deleteUser(Number(id));
      return deletedUser;
    }
}
