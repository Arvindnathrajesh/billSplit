import * as Mongoose from 'mongoose';
import { Activity } from 'src/packages/types/dtos/activity';

export interface ActivityDocument extends Activity, Mongoose.Document {}
