import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ReadingModule } from './reading/reading.module';
import { AdminModule } from './admin/admin.module';
import { AssessmentModule } from './assessment/assessment.module';
@Module({
  imports: [
    AssessmentModule,
    AdminModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReadingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
