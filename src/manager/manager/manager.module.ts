import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './entities/manager.entity';

@Module({

  imports: [
    MulterModule.register({
      dest: '/uploads',
    }),
    TypeOrmModule.forFeature([ManagerEntity])
  ],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
