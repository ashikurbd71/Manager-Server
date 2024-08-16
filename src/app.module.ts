import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MembersModule } from './members/members.module';
import { MemberEntity } from './members/entities/member.entity';
import { InstituteEntity } from './Setting/institute/entities/institute.entity';
import { InstituteModule } from './Setting/institute/institute.module';
import { DepartmentEntity } from './Setting/department/entities/department.entity';
import { DepartmentModule } from './Setting/department/department.module';
import { SemisterModule } from './Setting/semister/semister.module';
import { SemisterEntity } from './Setting/semister/entities/semister.entity';
import { BloodModule } from './Setting/blood/blood.module';
import { BloodEntity } from './Setting/blood/entities/blood.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NoticeEntity } from './notice/notice/entities/notice.entity';
import { NoticeModule } from './notice/notice/notice.module';
import { ManagerEntity } from './manager/manager/entities/manager.entity';
import { ManagerModule } from './manager/manager/manager.module';
import { MealEntity } from './manager/mealmanage/entities/mealmanage.entity';
import { MealmanageModule } from './manager/mealmanage/mealmanage.module';
import { MealextraEntity } from './manager/mealextra/entities/mealextra.entity';
import { MealextraModule } from './manager/mealextra/mealextra.module';
import { ReportEntity } from './myreport/report/entities/report.entity';
import { ReportModule } from './myreport/report/report.module';
// import { join } from 'path';
// import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    //   // Configure the root path to serve static files
    //   // serveRoot: './uploads', // The URL path prefix to serve static files
    // }),
    // Import the ConfigModule
    ConfigModule.forRoot(),

    // Import the TypeOrmModule with a useFactory function
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
  
      
        logging: true,

        entities : [

          MemberEntity,
          InstituteEntity,
          DepartmentEntity,
          SemisterEntity,
          BloodEntity,
          NoticeEntity,
          ManagerEntity,
          MealEntity,
          MealextraEntity,
          ReportEntity
        ]
        // You can add more options here, like entities, migrations, etc.
      }),
      inject: [ConfigService],
    }),

    // Import other modules such as UserModule

    MembersModule,
    InstituteModule,
    DepartmentModule,
    SemisterModule,
    BloodModule,
    NoticeModule,
    ManagerModule,
    MealmanageModule,
    MealextraModule,
    ReportModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
