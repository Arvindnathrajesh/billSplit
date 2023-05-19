import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { ActivityService } from 'src/packages/services/activity.service';
import { Activity, UserContribution } from 'src/packages/types/dtos/activity';

@UseGuards(AuthGuard)
@Controller({ path: '/activity' })
export class ActivityController {
  constructor(
    @Inject('ActivityService')
    private activityService: ActivityService,
  ) {}

  @Post('/create')
  public async createActivity(@Body() activity: Activity) {
    return await this.activityService.createActivity(activity);
  }

  @Get('/user')
  public async getActivitiesByUser(@User('userId') userId: number) {
    return await this.activityService.getActivitiesByUser(userId);
  }

  @Put('/user-payment')
  public async makeUserPayment(
    @User('userId') userId: number,
    @Query('activity-id') activityId: string,
  ) {
    return await this.activityService.makeUserPayment(userId, activityId);
  }

  @Put('/update/user-contribution/amount')
  public async updateUserContributionAmount(
    @Query('activity-id') activityId: string,
    @User('userId') userId: number,
    @Query('new-amount') newAmount: number,
  ) {
    return await this.activityService.updateUserContributionAmount(
      activityId,
      userId,
      newAmount,
    );
  }

  @Post('/add/user-contribution')
  public async addUserContribution(
    @Query('activity-id') activityId: string,
    @Body() userContribution: UserContribution,
  ) {
    return await this.activityService.addUserContribution(
      activityId,
      userContribution,
    );
  }
}
