import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { LoggerService } from '../common/logger/logger.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TestController],
  providers: [TestService, LoggerService],
})
export class TestModule {}
