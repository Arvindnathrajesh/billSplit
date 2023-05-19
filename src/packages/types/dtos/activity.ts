export enum STATE {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum PAYMENT_STATUS {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
}

export class UserContribution {
  userId: number;
  amountPayable: number;
  paymentStatus: PAYMENT_STATUS;
}

export class Activity {
  activityId: string;
  activityName: string;
  userContributions: [UserContribution];
  totalAmount: number;
  state: STATE;
}
