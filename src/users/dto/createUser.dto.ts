import { 
    IsNotEmpty,
    IsEmail,
    IsString,
    MinLength,
    MaxLength,
} from "class-validator";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}