import nodemailer, { SentMessageInfo } from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

import config from '../config/mail';

interface IMail {
  message: SentMessageInfo;
}

class Mail {
  public async sendMail(message: IMail): Promise<Mail> {
    const { host, port, secure, auth } = config;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
      tls: { rejectUnauthorized: false },
    });

    const viewPath = resolve(__dirname, '..', 'views', 'emails');

    transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      }),
    );

    return transporter.sendMail({ ...config.default, ...message });
  }
}

export default new Mail();
