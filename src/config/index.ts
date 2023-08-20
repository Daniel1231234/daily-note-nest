export enum ConfigOptions {
  NODE_ENV = 'nodeEnvironment',
  EMAIL_USER = 'emailUser',
  EMAIL_PASSWORD = 'emailPassword',
  MONGO_URI = 'mongoUri',
  UNSPLASH_ACCESS = 'unsplashAccess',
  UNSPLASH_SECRET = 'unsplashSecret',
}

export default () => ({
  nodeEnvironment: process.env.NODE_ENV,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  mongoUri: process.env.MONGO_URI,
  unsplashAccess: process.env.UNSPLASH_ACCESS,
  unsplashSecret: process.env.UNSPLASH_SECRET,
});
