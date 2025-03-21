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
import { UserEntity } from './user/user/entities/user.entity';
import { UserModule } from './user/user/user.module';
import { AuthModule } from './auth/auth/auth.module';
import { ImageEntity } from './image/image/entities/image.entity';
import { ImageModule } from './image/image/image.module';
import { BazalistEntity } from './bazarlist/bazalist/entities/bazalist.entity';
import { BazalistModule } from './bazarlist/bazalist/bazalist.module';
import { InformationModule } from './Setting/information/information.module';
import { InformationEntity } from './Setting/information/entities/information.entity';
// import { join } from 'path';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { CashinModule } from './cashin/cashin.module';
import { CashinEntity } from './cashin/entities/cashin.entity';
import { CashoutModule } from './cashout/cashout.module';
import { CashoutEntity } from './cashout/entities/cashout.entity';
import { RoomModule } from './room/room.module';
import { RoomEntity } from './room/entities/room.entity';

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
    TypeOrmModule.forRoot({

      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://Manager_owner:npg_Dof9nipk2rSy@ep-jolly-glade-a1yeo7q2-pooler.ap-southeast-1.aws.neon.tech/Manager?sslmode=require',
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false, // Required for NeonDB SSL connection
      },
      entities: [

        MemberEntity,
        InstituteEntity,
        DepartmentEntity,
        SemisterEntity,
        BloodEntity,
        NoticeEntity,
        ManagerEntity,
        MealEntity,
        MealextraEntity,
        ReportEntity,
        UserEntity,
        ImageEntity,
        BazalistEntity,
        InformationEntity,
        CashinEntity,
        CashoutEntity,
        RoomEntity
      ]

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
    ReportModule,
    UserModule,
    AuthModule,
    ImageModule,
    BazalistModule,
    InformationModule,
    CashinModule,
    CashoutModule,
    RoomModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
