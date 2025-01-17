import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import prisma from './prisma';
import { RegisterUserDTO } from './dto/register-user';
import { hashSync, compareSync } from 'bcrypt';
import { loginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  auth(id: number) {
    try {
      const user = prisma.user.findFirst({
        where : {
          id 
        }
      })
      if(user == null) throw new NotFoundException("Tidak Menemukan User")
      return user
    }catch(err) {
      if(err instanceof HttpException) throw err
      throw err
    }
  
  }

  async login(data: loginUserDTO) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });

      if (!user) {
        throw new NotFoundException('Username Tidak Ada');
      }

      const isPasswordValid = compareSync(data.Password, user.password);

      if (!isPasswordValid) {
        throw new BadRequestException('Password Salah');
      }

      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        token:token,
        user,
      };
    } catch (err) {
      throw new InternalServerErrorException('Terdapat masalah');
    }
  }

  async register(data: RegisterUserDTO) {
    const user = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (user) {
      throw new BadRequestException('Username Sudah Ada');
    }

    const hash = hashSync(data.Password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        password: hash,
        role: 'USER',
      },
    });

    return newUser;
  }

  async getMahasiswa() {
    return await prisma.mahasiswa.findMany();
  }

  async getMahasiswaByNIM(nim: string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
    });

    if (!mahasiswa) {
      throw new NotFoundException('Tidak Menemukan NIM');
    }

    return mahasiswa;
  }

  async deleteMahasiswa(nim: string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
    });

    if (!mahasiswa) {
      throw new NotFoundException('Tidak Menemukan NIM');
    }

    await prisma.mahasiswa.delete({
      where: {
        nim,
      },
    });

    return await prisma.mahasiswa.findMany();
  }

  async updateMahasiswa(nim: string, nama: string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
    });

    if (!mahasiswa) {
      throw new NotFoundException('Tidak Menemukan NIM');
    }

    await prisma.mahasiswa.update({
      where: {
        nim,
      },
      data: {
        nama,
      },
    });

    return await prisma.mahasiswa.findMany();
  }
}
