import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/entities/product.entity';

@Module({
  imports: [
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

          ProductEntity
        ]
        // You can add more options here, like entities, migrations, etc.
      }),
      inject: [ConfigService],
    }),

    // Import other modules such as UserModule
    UserModule,

    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
