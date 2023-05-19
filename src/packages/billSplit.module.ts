import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ActivityCollection,
  ActivitySchema,
} from './models/schemas/activity.schema';
import { UserDataCollection, UserSchema } from './models/schemas/user.schema';
import { ActivityService } from './services/activity.service';
import { SessionService } from './services/session.service';

import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'UserDataModel',
        schema: UserSchema,
        collection: UserDataCollection,
      },
      {
        name: 'ActivityModel',
        schema: ActivitySchema,
        collection: ActivityCollection,
      },
    ]),
  ],
  providers: [
    {
      provide: 'UserService',
      useClass: UserService,
    },
    {
      provide: 'ActivityService',
      useClass: ActivityService,
    },
    {
      provide: 'SessionService',
      useClass: SessionService,
    },
  ],
  exports: ['UserService', 'SessionService', 'ActivityService'],
})
export class BillSplit {}
