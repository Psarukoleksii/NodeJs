const mailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { constants } = require('../config');
const templatesInfo = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
})

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: constants.ROOT_EMAIL,
        pass: constants.ROOT_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try{

        const templateInfo = templatesInfo[action];

        if(!templateInfo) {
            throw new Error('wrong action mail');

        }

        const name = templateInfo.templateName;
        const subject = templateInfo.subject

        const html = await templateParser.render(name, context);

        return transporter.sendMail({
            from: 'NO REPLY',
            to: userMail,
            subject,
            html
        })
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    sendMail
};

