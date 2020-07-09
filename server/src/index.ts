import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { Application } from './config/Application';

dotenv.config();
export const application = new Application();
