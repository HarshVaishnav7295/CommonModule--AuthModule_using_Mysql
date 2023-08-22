import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserDto {
  
    @ApiProperty({example:"q123-2323"})
    @IsString()
    _id : string

    @ApiProperty({example:"Harsh"})
    @IsString()
    name: string;
  
    @ApiProperty({example:"harshvaishnav@techtic.agency"})
    @IsString()
    email: string;
  
    @ApiProperty({example:"www.google.com"})
    @IsString()
    profile_pic: string;

    @ApiProperty({example:"harsh@1234"})
    @IsString()
    password : string

    @ApiProperty({example:"1"})
    @IsString()
    login_type : number
  }
  