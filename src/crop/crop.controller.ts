import {
    Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CropService } from './crop.service';
import { GetUser } from 'src/auth/decorator';
import { CreateCropDto } from './dto';
import { EditCropDto } from './dto/edit-crop.dto';

@UseGuards(JwtGuard)
@Controller('crops')
export class CropController {
  constructor(private cropService: CropService) {}

  @Get()
  getCrops(@GetUser('id') userId: number) {
    return this.cropService.getCrops(userId)
  }

  @Get(':id')
  getCropById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) cropId: number) {
    return this.cropService.getCropById(userId, cropId)
  }

  @Post()
  createCrops(@GetUser('id') userId: number, @Body() dto: CreateCropDto) {
    return this.cropService.createCrop(userId, dto)
  }

  @Patch(':id')
  editCropById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) cropId: number, @Body() dto: EditCropDto) {
    return this.cropService.editCropById(userId, cropId, dto)
  }

  @Delete(':id')
  deleteCropById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) cropId: number) {
    return this.cropService.deleteCropById(userId, cropId)
  }
}
