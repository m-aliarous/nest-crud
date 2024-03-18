import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import User from './entities/user';
import { CreateUserDto } from './dtos/createUserDto';

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
    async createUser(@Body('createUserDto') createUserDto: CreateUserDto) {
      const newUser = await this.userService.createuser(createUserDto);
      return newUser;
    }
}
