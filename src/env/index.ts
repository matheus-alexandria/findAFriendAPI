import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3500)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.log('Invalid environment variables.', parsedEnv.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = parsedEnv.data;