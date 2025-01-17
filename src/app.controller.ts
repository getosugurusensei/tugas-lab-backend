import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UpdateMahasiswaDTO } from './dto/update-mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user';
import {loginUserDTO} from './dto/login-user.dto'
import { User } from '@prisma/client';
import { AuthGuard } from './auth.guard';
import { UserDecorator } from './user.decorartor';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("login")
  @ApiBody({type : loginUserDTO})
  login(@Body()data: loginUserDTO){
    return this.appService.login(data);
  }

  @Get("mahasiswa")
  getMahasiswa(){
    return this.appService.getMahasiswa();
  }
  @Post("register")
  @ApiBody({
    type : RegisterUserDTO
  })
  register(@Body()data : RegisterUserDTO){
    return this.appService.register(data)
  }
  
  @Get("/auth")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  auth(@UserDecorator() user : User) {
  return user
 }

  @Get("mahasiswa/:nim")
  getMahasiswaByNim(@Param("nim") nim : string ) {
    return this.appService.getMahasiswaByNIM(nim)
  }

  @Put("mahasiswa/:nim")
  @ApiBody({type: UpdateMahasiswaDTO})
  editMahasiswa(
    @Param("nim") nim: string,
    @Body(){nama} : UpdateMahasiswaDTO
  ){
    return this.appService.updateMahasiswa(nim,nama);
  }
  
  
  
  //DELETE locallhost:3000/mahasiswa/105841105522
  @Delete("Mahasiswa/:nim")
  DeleteMahasiswa(@Param("nim")nim : string){
    return this.appService.deleteMahasiswa(nim);
  }
}

