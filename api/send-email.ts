const nodemailer = require('nodemailer');
 
export default async function handler(req: any, res: any) {
    // 只接受 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
 
    const { name, company, email, message } = req.body;
 
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.FOLIO_EMAIL,
            pass: process.env.FOLIO_PASSWORD,
        },
    });
 
    try {
        await transporter.verify();
        await transporter.sendMail({
            from: `"${name}" <${process.env.FOLIO_EMAIL}>`,
            to: 'liushulin@azad.asia',  // ← 改成你自己的邮箱
            subject: `${name} <${email}> ${
                company ? `from ${company}` : ''
            } submitted a contact form`,
            text: `${message}`,
        });
        res.status(200).json({ message: 'success' });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}
