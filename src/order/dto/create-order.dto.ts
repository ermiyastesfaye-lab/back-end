import { IsNotEmpty, IsString } from "class-validator"

export class CreateOrderDto {
    @IsNotEmpty()
    cropId: string;

    @IsString()
    @IsNotEmpty()
    quantity: string;


  }