import { IsNotEmpty, IsString } from "class-validator"

export class CreateCropDto {
    @IsString()
    @IsNotEmpty()
    cropName: string

    @IsString()
    @IsNotEmpty()
    cropType: string

    @IsString()
    @IsNotEmpty()
    plantingDate: string

    @IsString()
    @IsNotEmpty()
    harvestingDate: string

    @IsString()
    @IsNotEmpty()
    price: string
}