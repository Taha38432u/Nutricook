const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url, to = null) {
    this.to = to || user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Taha Rasheed <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // ✅ Use Gmail in production
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
    }

    // 🧪 Use dev/test mail server in development (like Mailtrap)
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject, text) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };

    try {
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      console.error("❌ Email sending failed:", err);
      throw err;
    }
  }

  async sendWelcome() {
    await this.send(
      "Welcome",
      "Welcome to the NutriCook Family",
      `Hi ${this.firstName},\n\nWelcome to NutriCook! We're so excited to have you on board.\n\nVisit this link to get started: ${this.url}\n\nBest regards,\nTaha Rasheed`
    );
  }

  async sendPasswordReset() {
    await this.send(
      "Reset Password",
      "Your password reset token (valid for 10 minutes only)",
      `Hi ${this.firstName},

You requested a password reset. Please use the link below to reset your password. This link is valid for only 10 minutes.

${this.url}

If you didn't request a password reset, please ignore this email or contact our support if you have concerns.

Best regards,  
Taha Rasheed`
    );
  }

  async sendAdminMessage() {
    await this.send(
      "Reactivation Request",
      "A user has requested account reactivation",
      `Hi Admin,
  
  You have received a new reactivation request from the user: ${this.firstName} ${this.lastName} (${this.email}).
  
  Please check the admin dashboard to review and respond to the request.
  
  Best regards,  
  Taha Rasheed`
    );
  }

  async sendUserMessageReactivation() {
    await this.send(
      "Account Reactivated",
      "Your account has been successfully reactivated",
      `Hi ${this.firstName},
  
  Good news! Your account has been successfully reactivated. You can now log in and continue using our services as usual.
  
  If you have any questions or face any issues, feel free to reach out to our support team.
  
  Welcome back!  
  Best regards,  
  Taha Rasheed`
    );
  }
};
