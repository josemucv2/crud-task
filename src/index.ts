import dotenv from 'dotenv';
import { startServer } from './config/server';

// Load environment variables from .env file
dotenv.config();

// Start the server
startServer();
