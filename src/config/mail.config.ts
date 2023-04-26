export default () => ({
  mailer: {
    transport: {
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    },
    defaults: {
      from: 'sirguilhermeoliveira@gmail.com',
    },
  },
});
