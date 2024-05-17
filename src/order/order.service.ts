import { ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(private Prisma: PrismaService){}
    getOrders(userId: number){
        return this.Prisma.order.findMany({
            where: {
                userId
            }
        })  
    }
    
    getOrderById(userId: number, orderId: number){
        return this.Prisma.order.findFirst({
            where: {
                id: orderId,
                userId
            }
        })
    }
    
    async createOrder(userId: number, dto: CreateOrderDto) {
        // Fetch the crop details by cropId
        const cropId = parseInt(dto.cropId);
        const quantity = parseInt(dto.quantity)
        const crop = await this.Prisma.crop.findUnique({
            where: {
                id: cropId
            }
        });

        if (!crop) {
            throw new NotFoundException('Crop not found');
        }

        // Create the order with crop details and buyer's data
        const order = await this.Prisma.order.create({
            data: {
                userId,
                cropId: cropId,
                quantity: quantity,
                cropName: crop.cropName,
                cropType: crop.cropType,
                price: parseInt(crop.price)
            }
        });

        return order;
    }

    async deleteOrderById(userId: number, orderId: number){
        const order = await this.Prisma.order.findUnique({
            where: {
                id: orderId
            }
        })

        if(!orderId || order.userId != userId){
            throw new ForbiddenException('Access denied to resources')
        }

        await this.Prisma.order.delete({
            where: {
                id: orderId
            }
        })
    }
}
