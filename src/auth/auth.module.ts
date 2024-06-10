import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtEstrategyService } from './jwt/jwt-estrategy.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'sheepschat147999999999',
      signOptions: { expiresIn: '8h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtEstrategyService],
  exports: [AuthService],
})
export class AuthModule {}
