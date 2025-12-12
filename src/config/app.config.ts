interface IAppConfig {
  env: string;
  url: string;
  salts: number;
  port: number;
  client: { url: string };
  jwt: { secret: string };
  openai: { key: string; vector: string };
  email: { account: string; password: string };
  google: { secret: string };
}

export const AppConfig = (): IAppConfig => ({
  env: process.env.NODE_ENV || 'production',
  url: process.env.NODE_ENV || 'http://localhost:3000',
  salts: process.env.SALTS ? parseInt(process.env.SALTS) : 10,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  client: { url: process.env.CLIENT_URL || 'http://localhost:4200' },
  jwt: { secret: process.env.JWT_SECRET || 'klsahd' },
  openai: {
    key: process.env.OPENAI_API_KEY!,
    vector: process.env.OPENAI_VECTOR!,
  },
  email: {
    account: process.env.EMAIL_ACCOUNT!,
    password: process.env.EMAIL_PASSWORD!,
  },
  google: { secret: process.env.GOOGLE_SECRET! },
});
