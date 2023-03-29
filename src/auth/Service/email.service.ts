import * as nodemailer from 'nodemailer';

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.USER_MAIL,
      
        pass: process.env.USER_PASS
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: 'richardnova1999@gmail.com',
      to,
      subject,
      text,
      html ,
    };

    const result = await this.transporter.sendMail(mailOptions);
    console.log('user Verified');
  }
}
