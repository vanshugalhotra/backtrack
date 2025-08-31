import { Module } from '@nestjs/common';
import { ClearDbService } from './clear-db.service';
import { ClearDbController } from './clear-db.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ClearDbController],
  providers: [ClearDbService],
})
export class ClearDbModule {}
