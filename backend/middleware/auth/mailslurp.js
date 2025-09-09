const {MailSlurp} = require("mailslurp-client");
require('dotenv');
const { mailSlurp_apiKey} = process.env;

const mailslurp = new MailSlurp({ mailSlurp_apiKey });

module.exports = {
    mailslurp
};