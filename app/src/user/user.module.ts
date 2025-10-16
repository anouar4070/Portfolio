import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { UniqueEmail } from './validator/unique-email.validator';

@Module({
  providers: [UserService, UniqueEmail],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), EmailModule],
  exports: [UserService],
})
export class UserModule {}
