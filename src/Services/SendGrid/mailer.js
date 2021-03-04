const sgMail = require('@sendgrid/mail')

class Mailer {

    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    }

    async sendMail(to, from, subject, text) {

        return await sgMail.send({
            to: to,
            from: from,
            subject: subject,
            html: text
        })
    }
}

module.exports = new Mailer()
