const { emailActionsEnum } = require('../config');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },
    [emailActionsEnum.USER_BLOCKED]: {
        templateName: 'xxx',
        subject: 'Your account was blocked'
    },
    [emailActionsEnum.PASSWORD_CHANGED]: {
        templateName: 'zzz',
        subject: 'Password was changed'
    }
};
