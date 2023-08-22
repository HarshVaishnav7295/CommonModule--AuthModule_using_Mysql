import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Otps } from '../../entities/otps.entity';
import { OtpService } from '../../services/otp.service';
@Module({
    imports:[TypeOrmModule.forFeature([Otps])],
    providers:[OtpService],
exports:[OtpService]})
export class OtpModule {
    
}
