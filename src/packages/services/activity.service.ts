import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ActivityDocument } from '../models/documents/activity.document';
import {
  Activity,
  PAYMENT_STATUS,
  STATE,
  UserContribution,
} from '../types/dtos/activity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel('ActivityModel')
    private activityModel: mongoose.Model<ActivityDocument>,
  ) {}

  async getActivitiesByUser(userId) {
    return await this.activityModel.find({
      'userContributions.userId': userId,
    });
  }

  async getActivity(activityId: string) {
    return await this.activityModel.findOne({ activityId });
  }

  async createActivity(activity: Activity) {
    if (!activity.activityId) {
      throw new BadRequestException('ACTIVITY_ID_CANNOT_BE_EMPTY', {
        cause: new Error(),
        description: 'ACTIVITY_ID_CANNOT_BE_EMPTY',
      });
    }
    const existingActivity = await this.getActivity(activity.activityId);
    if (existingActivity) {
      throw new BadRequestException('ACTIVITY_ALREADY_EXISTS', {
        cause: new Error(),
        description: 'ACTIVITY_ALREADY_EXISTS',
      });
    }

    activity.userContributions.map((uc) => {
      uc.paymentStatus = PAYMENT_STATUS.UNPAID;
      return uc;
    });

    const totalAmount = activity.userContributions.reduce(
      (sum, userContribution) => {
        return (sum += userContribution.amountPayable);
      },
      0,
    );
    const newActivity: Activity = {
      activityId: activity.activityId,
      activityName: activity.activityName,
      userContributions: activity.userContributions,
      totalAmount: totalAmount,
      state: STATE.ACTIVE,
    };
    return await this.activityModel.create(newActivity);
  }

  async makeUserPayment(userId: number, activityId: string) {
    const activity: ActivityDocument = await this.getActivity(activityId);
    if (!activity) {
      throw new BadRequestException('ACTIVITY_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'ACTIVITY_DOES_NOT_EXIST',
      });
    }
    const userContribution = activity.userContributions.find(
      (uc) => uc.userId === userId,
    );
    if (!userContribution) {
      throw new BadRequestException('ACTIVITY_DOES_NOT_HAVE_THIS_USER', {
        cause: new Error(),
        description: 'ACTIVITY_DOES_NOT_HAVE_THIS_USER',
      });
    }
    if (userContribution.paymentStatus === PAYMENT_STATUS.PAID) {
      throw new BadRequestException('USER_ALREADY_PAID_THIS_ACTIVITY', {
        cause: new Error(),
        description: 'USER_ALREADY_PAID_THIS_ACTIVITY',
      });
    }

    activity.userContributions.find(
      (uc) => uc.userId === userId,
    ).paymentStatus = PAYMENT_STATUS.PAID;

    await activity.save();
    return activity.toObject();
  }

  async updateUserContributionAmount(
    activityId: string,
    userId: number,
    newAmount: number,
  ) {
    const activity: ActivityDocument = await this.getActivity(activityId);
    if (!activity) {
      throw new BadRequestException('ACTIVITY_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'ACTIVITY_DOES_NOT_EXIST',
      });
    }
    const userContribution = activity.userContributions.find(
      (uc) => uc.userId === userId,
    );
    if (!userContribution) {
      throw new BadRequestException('ACTIVITY_DOES_NOT_HAVE_THIS_USER', {
        cause: new Error(),
        description: 'ACTIVITY_DOES_NOT_HAVE_THIS_USER',
      });
    }
    activity.userContributions.find(
      (uc) => uc.userId === userId,
    ).amountPayable = newAmount;

    const totalAmount = activity.userContributions.reduce(
      (sum, userContribution) => {
        return (sum += userContribution.amountPayable);
      },
      0,
    );
    activity.totalAmount = totalAmount;

    await activity.save();
    return activity.toObject();
  }

  async addUserContribution(
    activityId: string,
    userContribution: UserContribution,
  ) {
    const activity: ActivityDocument = await this.getActivity(activityId);
    if (!activity) {
      throw new BadRequestException('ACTIVITY_DOES_NOT_EXIST', {
        cause: new Error(),
        description: 'ACTIVITY_DOES_NOT_EXIST',
      });
    }

    if (
      activity.userContributions.find(
        (uc) => uc.userId === userContribution.userId,
      )
    ) {
      throw new BadRequestException(
        'USER_CONTRIBUTION_ALREADY_EXISTS_IN_THIS_ACTIVITY',
        {
          cause: new Error(),
          description: 'USER_CONTRIBUTION_ALREADY_EXISTS_IN_THIS_ACTIVITY',
        },
      );
    }

    activity.userContributions.push(userContribution);

    const totalAmount = activity.userContributions.reduce(
      (sum, userContribution) => {
        return (sum += userContribution.amountPayable);
      },
      0,
    );
    activity.totalAmount = totalAmount;

    await activity.save();
    return activity.toObject();
  }
}
