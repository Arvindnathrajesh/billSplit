import { Schema } from 'mongoose';
import { USER_STATUS } from 'src/packages/types/dtos/user';
const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(
  'mongodb://mongo:27017/bill-split',
);

export const UserSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    emailId: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    hashedPassword: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS).map((key) => USER_STATUS[key]),
    },
  },
  {
    timestamps: true,
  },
);

autoIncrement.initialize(connection);
UserSchema.plugin(autoIncrement.plugin, {
  model: 'UserDataModel',
  field: 'userId',
});

export const UserDataCollection = 'userData';
