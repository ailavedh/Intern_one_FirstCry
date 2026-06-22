const nodemailer = require('nodemailer');
require('dotenv').config();

async function testSMTP(port, secure) {
  console.log(`\n--- Testing SMTP on Port ${port} (Secure: ${secure}) ---`);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: port,
      secure: secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      connectionTimeout: 5000, // 5 seconds
      greetingTimeout: 5000,   // 5 seconds
      socketTimeout: 5000      // 5 seconds
    });

    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `"Daily Activity Portal Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // send to self
      subject: `Test SMTP Port ${port}`,
      text: `This is a test email sent using port ${port}.`
    });
    console.log(`Success! Message ID: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error(`Failed on Port ${port}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('SMTP Config from .env:');
  console.log('User:', process.env.SMTP_USER);
  console.log('Pass:', process.env.SMTP_PASS ? '********' : 'Not Set');
  
  const ok465 = await testSMTP(465, true);
  const ok587 = await testSMTP(587, false);
  
  process.exit(ok465 || ok587 ? 0 : 1);
}

main();
