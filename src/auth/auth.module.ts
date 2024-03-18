import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/user/entities/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  providers: [AuthService,UserService],
  controllers: [AuthController],
})
export class AuthModule {}
