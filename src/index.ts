import dontenv from 'dotenv';
import { startServer } from './config/server'

dontenv.config()

startServer()