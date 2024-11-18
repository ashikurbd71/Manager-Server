import { Module } from '@nestjs/common';
import { CashoutService } from './cashout.service';
import { CashoutController } from './cashout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashoutEntity } from './entities/cashout.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([CashoutEntity]), // Register the entity here
  ],
  controllers: [CashoutController],
  providers: [CashoutService],
})
export class CashoutModule {}
