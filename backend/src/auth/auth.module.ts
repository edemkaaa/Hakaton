import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './constants';
import { EsiaController } from './controllers/esia.controller';
import { EsiaService } from './services/esia.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    ConfigModule.forRoot(), // Добавляем forRoot()
  ],
  controllers: [
    AuthController,
    EsiaController,
  ],
  providers: [
    AuthService,
    EsiaService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
