import { Injectable, NotFoundException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {} // Inject UserService

  async authenticate(authenticateDto: AuthenticateDto){
    const user = await this.userService.getUserByEmail(authenticateDto.email);
    if (!user) throw new NotFoundException('Invalid credentials');

    const token = sign({ ...user }, 'secrete');

    return { token, user };
  }
}
