import { Controller, Get, Res,Req,Body, UseGuards, Patch, Delete, Post } from '@nestjs/common';
import { Response,Request } from 'express';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthenticationGuard } from '../../guards/authentication.guard';
import { UserService } from '../../services/user.service';
import { ILogout } from 'src/interfaces/Logout.interface';
import { IGetMyProfile } from 'src/interfaces/GetMyProfile.interface';
import { IUpdateProfile } from 'src/interfaces/UpdateProfile.interface';
import { UpdateProfileDto } from 'src/dtos/user.dtos/UpdateProfile.dto';
import { IUpdatePassword } from 'src/interfaces/UpdatePassword.interface';
import { UpdatePasswordDto } from 'src/dtos/user.dtos/UpdatePassword.dto';
import { IDeleteAccount } from 'src/interfaces/DeleteAccount.interface';
@Controller('api/user')
@UseGuards(AuthenticationGuard)
export class UserController {
    constructor(private userService:UserService){}

    @Get('/getMyProfile')
    @ApiOkResponse({
        type:IGetMyProfile
    })
    @ApiBearerAuth() // it is required to make api call from swagger under auth guard
    async getMyProfile(@Res() res:Response,@Req() req:Request){
        try{
            const userId = req['user']
            const {profile,statusCode,success,error} = await this.userService.GetUserProfile(userId)
            return res.status(statusCode).json({
                success,
                error,
                profile
            })
        }catch(error:any){
            return res.status(500).json({
                success:false,
                error:error.message
            })
        }
    }

    @Patch('/')
    @ApiOkResponse({
        type:IUpdateProfile
    })
    @ApiBearerAuth() // it is required to make api call from swagger under auth guard
    async updateMyProfile(@Req() req:Request,@Res() res:Response,@Body() body:UpdateProfileDto){
        try{
            const userId = req['user']
            const profile = await this.userService.UpdateProfile(userId,body)
            return res.status(200).json({
                success:true,
                updatedProfile : profile
            })
        }catch(error:any){
            return res.status(500).json({
                success:false,
                error:error.message
            })
        }
    }

    @Delete('/')
    @ApiOkResponse({
        type:IDeleteAccount
    })
    @ApiBearerAuth() // it is required to make api call from swagger under auth guard
    async deleteMyProfile(@Req() req:Request,@Res() res:Response){
        try{
            const userId = req['user']
            await this.userService.DeleteUser(userId)
            return res.status(200).json({
                success:true,
                message : "User account deleted"
            })
        }catch(error:any){
            return res.status(500).json({
                success:false,
                error:error.message
            })
        }
    }

    @Patch('/updatePassword')
    @ApiOkResponse({
        type:IUpdatePassword
    })
    @ApiBearerAuth() // it is required to make api call from swagger under auth guard
    async updatePassword(@Req() req:Request,@Res() res:Response,@Body() body:UpdatePasswordDto){
        try{
            if(!body.oldPassword || !body.newPassword){
                return res.status(400).json({
                    success:false,
                    error:"Please provide both oldPassword and newPassword fields"
                })
            }else{
                const userId = req['user']
                const passwordUpdated = await this.userService.UpdatePassword({userId,oldPassword:body.oldPassword,newPassword:body.newPassword})
                if(passwordUpdated.success){
                    return res.status(passwordUpdated.statusCode).json({
                        success:true,
                        message:"Password updated"
                    })
                }else{
                    return res.status(passwordUpdated.statusCode).json({
                        success:false,
                        error:passwordUpdated.error
                    })
                }
            }
        }catch(error:any){
            return res.status(500).json({
                success:false,
                error:error.message
            })
        }
    }

    @Post('/logout')
    @ApiOkResponse({
        type:ILogout
    })
    @ApiBearerAuth() // it is required to make api call from swagger under auth guard
  async logout(@Req() req:Request,@Res() res:Response){
    try{
      const userId = req['user']
      console.log("user",userId)
      await this.userService.Logout(userId)
      return res.status(200).json({
        success:true,
        message:"Logout successful"
      })
    }catch(error:any){
      return res.status(500).json({
        success:false,
        error:error.message
      })
    }
  }
}
