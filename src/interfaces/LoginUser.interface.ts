import { ApiProperty } from "@nestjs/swagger"
import { UserProfileDto } from "../dtos/user.dtos/UserProfile.dto"

export class ILogin{
    @ApiProperty({example:"true"})
    success : boolean
    @ApiProperty({example:""})
    error : string
    @ApiProperty({example:{
        _id:"123",
        name:"Harsh Vaishnav",
        email:"harshvaishnav@techtic.agency",
        profilePic:"www.google.com",
        fb_id:"23232323",
        google_id:"343434",
        apple_id:"de4d5ed"
    }})
    user : UserProfileDto
    @ApiProperty({example:"dewewerwer23423423"})
    accessToken:string
}