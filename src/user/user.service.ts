import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUserDto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    
      async getAllUsers() {
        const users = this.userRepository.find();
        return users;
      }
    
      async getuserById(id: number) {
        const user = await this.userRepository.findOne({
          where: {
            id: id,
          },
        });
        if (user) {
          return user;
        }
        throw new NotFoundException('Could not find the user');
      }
    
      async createuser(createUserDto?: CreateUserDto) {
        if (!createUserDto) {
            throw new HttpException('createUserDto is undefined', HttpStatus.BAD_REQUEST);
          }
        const { firstName, lastName, email } = createUserDto;
        const newuser = await this.userRepository.create({firstName,lastName,email});
        await this.userRepository.save(newuser);
        return newuser;
      }
}
