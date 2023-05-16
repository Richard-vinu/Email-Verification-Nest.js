import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,

      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User], // Add your entity classes here
      synchronize: true, // Auto-create database schema (only for development)
    }),
    TypeOrmModule.forFeature([User, UserRepository]),
    // Add this line to import UserRepository
    MailerModule.forRoot({
      transport: {
        // Specify your mail transport configuration here
        // For example, using SMTP:
        host: 'smtp://sandbox.smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
          user: 'richard.andrew@zysk.tech',
          pass: 'phonepay@123',
        },
      },
      defaults: {
        // Define default values for the mail options
        from: 'richard.andrew@zysk.tech',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export class AppModule {}
