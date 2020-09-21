import Mail from '../lib/Mail';

import User from '../models/User';

interface IMail {
  email: string;
  user: User;
  token: string;
}

class ForgotPasswordMail {
  get key() {
    return 'ForgotPasswordMail';
  }

  public async handle({ email, user, token }: IMail): Promise<void> {
    await Mail.sendMail({
      to: `${user.name} <${email}>`,
      subject: 'Recuperação de senha',
      template: 'resetPassword',
      context: {
        name: user.name,
        email,
        token,
      },
    });
  }
}

export default new ForgotPasswordMail();
