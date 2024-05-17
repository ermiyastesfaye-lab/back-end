import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password); // Hash password using Argon2
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    role: dto.role,
                    hash: hash
                }
            });

            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Credentials already taken');
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            }
        });

        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }

        const pwMatches = await argon.verify(user.hash, dto.password); // Verify password using Argon2
        if (!pwMatches) {
            throw new ForbiddenException('Credentials incorrect');
        }

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{access_token: string}> {
        const payload = { sub: userId, email };
        const secret = this.configService.get('JWT_SECRET');
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '60m',
            secret: secret,
        });
        return {
            access_token: token,
        };
    }
}
