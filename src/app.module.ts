import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config';
import { TypeOrmModule } from '@nestjs/typeorm';;
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import User from './user/entities/user';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => configService.get('database'),
    inject: [ConfigService],
  }),
    UserModule,
  AuthModule,
  PassportModule,
  JwtModule.register({ secret: 'secrete', signOptions: { expiresIn: '1h' } }),
  TypeOrmModule.forFeature([User])],
  controllers: [AppController, AuthController],
  providers: [AppService, UserService, AuthService, JwtStrategy],
})
export class AppModule {}
