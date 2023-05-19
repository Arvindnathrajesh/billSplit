import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillSplit } from './packages/billSplit.module';
import { UserController } from './controllers/user.controller';
import { ActivityController } from './controllers/activity.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/bill-split'),
    BillSplit,
  ],
  controllers: [AppController, UserController, ActivityController],
  providers: [AppService],
})
export class AppModule {}
