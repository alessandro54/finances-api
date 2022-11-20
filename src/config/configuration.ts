export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  database: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.SECRET,
  },
});
