import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'sandbox.smtp.mailtrap.io',
    //     auth: {
    //       user: '5646eccd122d09',
    //       pass: '1242627b76aec5',
    //     },
    //   },
    // }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
