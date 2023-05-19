import { Schema } from 'mongoose';
import { PAYMENT_STATUS, STATE } from 'src/packages/types/dtos/activity';

export const ActivitySchema = new Schema(
  {
    activityId: {
      type: String,
      required: true,
    },
    activityName: {
      type: String,
    },
    userContributions: [
      {
        _id: false,
        userId: {
          type: Number,
        },
        amountPayable: {
          type: Number,
        },
        paymentStatus: {
          type: String,
          enum: Object.keys(PAYMENT_STATUS).map((key) => PAYMENT_STATUS[key]),
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    state: {
      type: String,
      enum: Object.keys(STATE).map((key) => STATE[key]),
    },
  },
  {
    timestamps: true,
  },
);

export const ActivityCollection = 'activity';
