import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { Users } from '../../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants/jwt.constant';
import { OtpModule } from '../otp/otp.module';
import { AuthService } from '../../services/auth.service';
import { EmailModule } from '../email/email.module';
import {TypeOrmModule} from '@nestjs/typeorm'
@Module({
  imports:[TypeOrmModule.forFeature([Users]),UserModule,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3d' },
  }),EmailModule,OtpModule],
  controllers: [AuthController],
  exports : [AuthService],
  providers:[AuthService]
})
export class AuthModule {}
