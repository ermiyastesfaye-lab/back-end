import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class EditCropDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    cropName?: string

    @IsString()
    @IsNotEmpty()
     @IsOptional()
    cropType?: string

    @IsString()
    @IsNotEmpty()
     @IsOptional()
    plantingDate?: string

    @IsString()
    @IsNotEmpty()
     @IsOptional()
    harvestingDate?: string

    @IsString()
    @IsNotEmpty()
     @IsOptional()
    price?: string
}