import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [UserModule,
     TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 3000,
    username: 'postgres',
    password: 'postgres',
    database: 'Test',
    entities: [],
    synchronize: true,
  }),],
  controllers: [],
  providers: []

})
export class AppModule {}
 