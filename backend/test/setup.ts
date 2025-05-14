import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

export default () => {
  dotenv.config({ path: '.env.test' });

  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
};
