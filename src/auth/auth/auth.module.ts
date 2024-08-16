
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user/entities/user.entity';
import { UsersService } from 'src/user/user/user.service';
import { UserModule } from 'src/user/user/user.module';


@Module({
  imports: [


  TypeOrmModule.forFeature([
      UserEntity,
      
   
    ]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIREIN ?? '365d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,

  ],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
