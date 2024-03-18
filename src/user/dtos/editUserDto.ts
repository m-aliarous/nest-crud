import { IsString, IsEmail, IsNotEmpty} from 'class-validator';
import UserType from '../enums/userType';
export class EditUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  userType: UserType

}