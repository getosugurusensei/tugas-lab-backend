import { ApiProperty } from "@nestjs/swagger";
import { Jenis_Kelamin } from "@prisma/client";
import { IsNotEmpty, IsString,Length,isNotEmpty,length,IsEnum} from "class-validator";
export class UpdateMahasiswaDTO{
    
       @ApiProperty({description : "nim",
              type : String,
              example : "105841105522"
          })
          @IsString()
          @IsNotEmpty()
          @Length(1,12)
          nim: string;
      
      
          @ApiProperty({description : "Nama",
              type : String,
              example : "M. FIKRI HAIKAL AYATULLAH"
          })
          @IsString()
          @IsNotEmpty()
          @Length(1,50)
          nama: string;
      
          @ApiProperty({description : "kelas",
              type : String,
              example : "5B"
          })
          @IsString()
          @IsNotEmpty()
          @Length(1,50)
          kelas: string;
      
          @ApiProperty({description : "jurusan",
              type : String,
              example : "informatika"
          })
          @IsString()
          @IsNotEmpty()
          @Length(1,50)
          jurusan: string;
      
          @ApiProperty({description : "Jenis_Kelamin",
              enum : Jenis_Kelamin,
              example : "L"
          })
          @IsEnum(Jenis_Kelamin)
          jenis_kelamin: Jenis_Kelamin;
      
      }
