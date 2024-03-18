import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import User from './entities/user';
import { CreateUserDto } from './dtos/createUserDto';
import { EditUserDto } from './dtos/editUserDto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
      const users = await this.userService.getAllUsers();
      return users;
    }
  
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User> {
      const user = await this.userService.getuserById(Number(id));
      return user;
    }
  
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
      const newUser = await this.userService.createuser(createUserDto);
      return newUser;
    }

    @Put(':id')
    async editUser(@Param('id') id: string, @Body() editUserDto: EditUserDto) {
      const updatedUser = await this.userService.updateUser(Number(id), editUserDto);
      return updatedUser;
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<User> {
      const deletedUser = await this.userService.deleteUser(Number(id));
      return deletedUser;
    }
}
