import { Module } from '@nestjs/common';
import { EmailService } from '../../services/email.service';

@Module({
    exports:[EmailService],
    providers:[EmailService]
})
export class EmailModule {
  
}
