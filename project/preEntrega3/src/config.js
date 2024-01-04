export default{
  port: process.env.PORT,
  persistence: process.env.PERSISTENCE,
  env: process.env.ENV,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  githubClientID: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubCallbackUrl: process.env.GITHUB_CALLBACK_URI,
}