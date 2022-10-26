import {
    IsNotEmpty,
    IsString,
    IsNumberString,
} from "class-validator";

export class CreateProductDTO {
    @IsNumberString()
    codebar: number;
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumberString({maxDecimalPlaces: 2})
    price: number;

    @IsString()
    description: string;

}

