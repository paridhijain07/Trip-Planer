const { Resend } = require('resend');
const dotenv = require('dotenv');
dotenv.config();

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const response = await resend.emails.send({
            from: 'tripGuide <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        console.log('Email sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;
