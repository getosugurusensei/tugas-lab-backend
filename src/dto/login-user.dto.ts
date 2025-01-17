import { ApiProperty } from "@nestjs/swagger";
import { IsString,Matches,Length,IsNotEmpty, isString, matches } from "class-validator";

export class loginUserDTO{
    @ApiProperty({
        description : "username",
        type:String,
        example: "M. FIKRI HAIKAL AYATULLAH"
    })
    @IsString()
    @ApiProperty()
    @Matches(/^\S*$/i)
    @Length(1,30)
    username : string;


    @ApiProperty({
        description : "Password",
        type:String,
        example: "Password"
    })
    @IsString()
    @ApiProperty()
    @Matches(/^\S*$/i)
    @Length(1,30)
    Password : string;
}