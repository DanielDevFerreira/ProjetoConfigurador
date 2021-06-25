import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      UserRepository
    ]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {

}
