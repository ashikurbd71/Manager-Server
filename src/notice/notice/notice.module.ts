import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { NoticeEntity } from './entities/notice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports :[ TypeOrmModule.forFeature([NoticeEntity])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
