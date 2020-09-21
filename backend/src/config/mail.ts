export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe Projeto Aplicado <noreply@projeto.com>',
  },
  token: {
    secret: '986c3a558b2aca02d1c585daa3775d6b',
    expiresIn: '1d',
  },
};
