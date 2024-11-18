import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashinService } from './cashin.service';
import { CashinController } from './cashin.controller';
import { CashinEntity } from './entities/cashin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CashinEntity]), // Register the entity here
  ],
  controllers: [CashinController],
  providers: [CashinService],
})
export class CashinModule {}
