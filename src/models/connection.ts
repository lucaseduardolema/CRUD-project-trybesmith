import dotenv from 'dotenv';
import myslq from 'mysql2/promise';

dotenv.config();

export default myslq.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
