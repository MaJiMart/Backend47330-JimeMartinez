import nodemailer from 'nodemailer';
import config from '../config.js';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.userEmail,
        pass: config.userPass,
      },
    })
  }

  sendEmail(to, subject, html, attachments = []) {
    return this.transporter.sendMail({
      from: config.userEmail,
      to,
      subject,
      html,
      attachments,
    });
  }
}

export default new MailService();