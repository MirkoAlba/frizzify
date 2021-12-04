module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '43879e4949ecf4e54dd3f2b8b4fa822f'),
  },
});
