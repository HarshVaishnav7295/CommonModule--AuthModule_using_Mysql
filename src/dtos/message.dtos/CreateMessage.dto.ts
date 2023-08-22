import { ApiProperty } from "@nestjs/swagger"
import { IsString,IsEmail, IsBoolean } from "class-validator"

export class CreateMessage{

    @ApiProperty({example:"testing123"})
    @IsString()
    data : string

    @ApiProperty({example:"1234"})
    @IsString()
    sender : string

    @ApiProperty({example:"4657"})
    @IsString()
    receiver : string

}