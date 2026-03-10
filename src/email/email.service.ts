import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: this.configService.get<boolean>('SMTP_SECURE', false),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendLoginNotification(
    email: string,
    name: string,
    ipAddress: string,
    timestamp: Date,
  ): Promise<void> {
    const appName = this.configService.get<string>('APP_NAME', 'Your App');
    const appUrl = this.configService.get<string>('APP_URL', 'http://localhost:3000');

    const htmlContent = this.getLoginNotificationTemplate(
      name,
      email,
      appName,
      ipAddress,
      timestamp,
      appUrl,
    );

    await this.transporter.sendMail({
      from: `"${appName}" <${this.configService.get<string>('SMTP_FROM')}>`,
      to: email,
      subject: 'Did You Login From a New Device or Location?',
      html: htmlContent,
    });
  }

  async sendOTP(
    email: string,
    name: string,
    otp: string,
  ): Promise<void> {
    const appName = this.configService.get<string>('APP_NAME', 'Your App');
    const appUrl = this.configService.get<string>('APP_URL', 'http://localhost:3000');

    const htmlContent = this.getOTPTemplate(
      name,
      appName,
      otp,
      appUrl,
    );

    await this.transporter.sendMail({
      from: `"${appName}" <${this.configService.get<string>('SMTP_FROM')}>`,
      to: email,
      subject: 'Your Login OTP Code',
      html: htmlContent,
    });
  }

  private getOTPTemplate(
    name: string,
    appName: string,
    otp: string,
    appUrl: string,
  ): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #1a1a1a;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 40px 30px;
    }
    h1 {
      color: #1a1a1a;
      font-size: 24px;
      margin: 0 0 20px 0;
      font-weight: 600;
    }
    p {
      color: #333333;
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 15px 0;
    }
    .otp-box {
      background-color: #f9f9f9;
      border: 2px solid #ffd700;
      border-radius: 8px;
      padding: 20px;
      margin: 30px 0;
      text-align: center;
    }
    .otp-code {
      font-size: 36px;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 8px;
      font-family: 'Courier New', monospace;
    }
    .otp-label {
      font-size: 14px;
      color: #666666;
      margin-bottom: 10px;
    }
    .warning {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin: 20px 0;
      font-size: 14px;
      color: #856404;
    }
    .help-text {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
    }
    .help-text a {
      color: #ffd700;
      text-decoration: none;
    }
    .disclaimer {
      font-size: 13px;
      color: #999999;
      font-style: italic;
      margin-top: 20px;
    }
    .footer {
      background-color: #f9f9f9;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    .footer-text {
      color: #ffd700;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <!-- You can add a logo here if needed -->
    </div>
    <div class="content">
      <h1>Your Login Code</h1>
      <p>Hi ${name},</p>
      <p>
        You requested to login to your <strong>${appName}</strong> account. 
        Use the code below to complete your login:
      </p>
      
      <div class="otp-box">
        <div class="otp-label">Your OTP Code</div>
        <div class="otp-code">${otp}</div>
      </div>

      <div class="warning">
        ⚠️ This code will expire in 10 minutes. Do not share this code with anyone.
      </div>

      <p class="help-text">
        If you didn't request this code, please ignore this email or 
        <a href="${appUrl}/support">contact support</a> if you have concerns.
      </p>

      <p class="disclaimer">
        This is an automated message, please do not reply.
      </p>
    </div>
    
    <div class="footer">
      <p class="footer-text">Stay connected!</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  private getLoginNotificationTemplate(
    name: string,
    email: string,
    appName: string,
    ipAddress: string,
    timestamp: Date,
    appUrl: string,
  ): string {
    const formattedDate = timestamp.toISOString().replace('T', ' ').substring(0, 19) + '(UTC)';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Notification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #1a1a1a;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 40px 30px;
    }
    h1 {
      color: #1a1a1a;
      font-size: 24px;
      margin: 0 0 20px 0;
      font-weight: 600;
    }
    p {
      color: #333333;
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 15px 0;
    }
    .highlight {
      background-color: #ffd700;
      padding: 2px 4px;
      font-weight: 500;
    }
    .info-box {
      background-color: #f9f9f9;
      border-left: 4px solid #ffd700;
      padding: 15px;
      margin: 20px 0;
    }
    .info-box p {
      margin: 5px 0;
      font-size: 14px;
    }
    .info-label {
      font-weight: 600;
      color: #1a1a1a;
    }
    .button {
      display: inline-block;
      background-color: #ffd700;
      color: #1a1a1a;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 4px;
      font-weight: 600;
      margin: 20px 0;
      font-size: 16px;
    }
    .button:hover {
      background-color: #ffed4e;
    }
    .help-text {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
    }
    .help-text a {
      color: #ffd700;
      text-decoration: none;
    }
    .disclaimer {
      font-size: 13px;
      color: #999999;
      font-style: italic;
      margin-top: 20px;
    }
    .footer {
      background-color: #f9f9f9;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    .footer-text {
      color: #ffd700;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .social-links {
      margin-top: 15px;
    }
    .social-links a {
      display: inline-block;
      margin: 0 8px;
      color: #666666;
      text-decoration: none;
      font-size: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <!-- You can add a logo here if needed -->
    </div>
    <div class="content">
      <h1>Did You Login From a New Device or Location?</h1>
      <p>
        We noticed your <span class="highlight">${appName}</span> account 
        <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a> 
        was accessed from a new IP address.
      </p>
      
      <div class="info-box">
        <p><span class="info-label">When</span> : ${formattedDate}</p>
        <p><span class="info-label">IP Address</span> : ${ipAddress}</p>
      </div>

      <a href="${appUrl}" class="button">Visit Your Account</a>

      <p class="help-text">
        Don't recognize this activity? Please 
        <a href="${appUrl}/reset-password">reset your password</a> and contact 
        <a href="${appUrl}/support">customer support</a> immediately.
      </p>

      <p class="disclaimer">
        This is an automated message, please do not reply.
      </p>
    </div>
    
    <div class="footer">
      <p class="footer-text">Stay connected!</p>
      <div class="social-links">
        <a href="#" title="X (Twitter)">𝕏</a>
        <a href="#" title="Telegram">✈</a>
        <a href="#" title="Facebook">f</a>
        <a href="#" title="LinkedIn">in</a>
        <a href="#" title="YouTube">▶</a>
        <a href="#" title="Reddit">⊙</a>
        <a href="#" title="Instagram">📷</a>
      </div>
    </div>
  </div>
</body>
</html>
    `;
  }
}
