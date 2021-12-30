import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async getUser(username: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.password;
    return user;
  }

  async createUser(data: RegisterUserDto): Promise<User> {
    const existing = await this.prismaService.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    delete user.password;
    return user;
  }
}
