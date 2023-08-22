import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserProfileDto {
  
    @ApiProperty({example:"q123-2323"})
    @IsString()
    _id : string;

    @ApiProperty({example:"Harsh"})
    @IsString()
    name: string;
  
    @ApiProperty({example:"harshvaishnav@techtic.agency"})
    @IsString()
    email: string;
  
    @ApiProperty({example:"www.google.com"})
    @IsString()
    profile_pic?: string;
  
    @ApiProperty({example:"dd3232s"})
    @IsString()
    fb_id?:string
  
    @ApiProperty({example:"dffgrg453"})
    @IsString()
    google_id?:string
  
    @ApiProperty({example:"ff2243"})
    @IsString()
    apple_id?:string
  }
  