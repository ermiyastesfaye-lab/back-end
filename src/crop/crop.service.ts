import { ForbiddenException, Injectable} from '@nestjs/common';
import { CreateCropDto } from './dto';
import { EditCropDto } from './dto/edit-crop.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CropService {
    constructor(private Prisma: PrismaService){}
    getCrops(userId: number){
        return this.Prisma.crop.findMany({
            where: {
                userId
            }
        })
    }
    
    getCropById(userId: number, cropId: number){
        return this.Prisma.crop.findFirst({
            where: {
                id: cropId,
                userId
            }
        })
    }
    
    async createCrop(userId: number, dto: CreateCropDto){
        const crop = await this.Prisma.crop.create({
            data: {
                userId,
                ...dto
            }
        })

        return crop
    }

    async editCropById(userId: number, cropId: number, dto: EditCropDto){
        const crop = await this.Prisma.crop.findUnique({
            where: {
                id: cropId
            }
        })

        if(!cropId || crop.userId != userId){
            throw new ForbiddenException('Access denied to resources')
        }

        return this.Prisma.crop.update({
            where: {
                id: cropId
            },
            data: {
                ...dto
            }
        })

    }

    async deleteCropById(userId: number, cropId: number){
        const crop = await this.Prisma.crop.findUnique({
            where: {
                id: cropId
            }
        })

        if(!cropId || crop.userId != userId){
            throw new ForbiddenException('Access denied to resources')
        }

        await this.Prisma.crop.delete({
            where: {
                id: cropId
            }
        })
    }
}
