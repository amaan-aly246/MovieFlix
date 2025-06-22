import { config as loadEnv } from "dotenv";

loadEnv();

const config = {
  env: {
    databaseUrl: process.env.DATABASE_URL!,
    port: process.env.PORT,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  },
};

export default config;
