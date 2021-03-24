const cron = require('node-cron');

const calculateUsersCount = require('./calculate-statistic');
const tokens = require('./deleteTokens');

module.exports = () => {
    cron.schedule('*/10 * * * * *',  ()=>{
        // calculateUsersCount();
        // console.log('from calculate');
        // tokens();
    })
}
