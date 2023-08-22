import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Otps } from "../entities/otps.entity";
const otpGenerator = require('otp-generator')

@Injectable()
export class OtpService{

    constructor(@InjectRepository(Otps) private otpRepository : Repository<Otps> ){}

    async generateOtp(data:{
        email : string,
        length : number,
        isDigitsAllowed:boolean,
        isLowerCaseAlphabetsAllowed:boolean,
        isUppercaseAlphabetsAllowed:boolean,
        isSpecialCharsAllowed:boolean
    }){
        try{
            console.log("otp called")
            const otp = otpGenerator.generate(data.length,{
                digits : data.isDigitsAllowed,
                lowerCaseAlphabets : data.isLowerCaseAlphabetsAllowed,
                upperCaseAlphabets : data.isUppercaseAlphabetsAllowed,
                specialChars : data.isSpecialCharsAllowed
            })
            const otpExists = await this.otpRepository.findOneBy({
                email : data.email
                
            })
            console.log("otpExists->",otpExists)
            if(otpExists){
                const otpEntry = await this.otpRepository.update({
                    _id : otpExists._id
                },{
                    otp : otp
                })
            }else{
                const otpEntry = this.otpRepository.create({
                    otp : otp,
                    email : data.email
                })
                await this.otpRepository.save(otpEntry)
            }
            return {
                success:true,
                otp : otp,
                error:""
            }
        }catch(error:any){
            console.log("Error->",error)
            return {
                success:false,
                otp : "",
                error:error
            }
        }
    }

    async verifyOtp(data:{email:string,otp:string}){
        try{
            console.log("otp called")
            const otpEntry = await this.otpRepository.findOneBy({
                    email : data.email,
                    otp : data.otp
                
            })
            if(otpEntry && otpEntry._id){
                return {
                    success:true,
                    isVerified:true
                }
            }else{
                return {
                    success:true,
                    isVerified:false
                }
            }
        }catch(error:any){
            return {
                success:false,
                error:error,
                isVerified:false
            }
        }
    }
}