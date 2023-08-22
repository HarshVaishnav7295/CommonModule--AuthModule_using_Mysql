import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entities/user.entity';
import { UserService } from '../../services/user.service';
import { EmailModule } from '../email/email.module';
import { OtpModule } from '../otp/otp.module';
@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  exports:[UserService],
  providers:[UserService]
})
export class UserModule {}
