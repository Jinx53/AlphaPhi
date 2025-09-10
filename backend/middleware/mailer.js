const nodemailer = require('nodemailer');
const {authenticate} = require('./auth/google');
const {ses, aws} = require("./auth/aws");
const {mailslurp} = require("./auth/aws");
const path = require('path');
const { firebaserules_v1 } = require('googleapis');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const {gmail_email, cpanel_email, cpanel_email_pass, email_host, mailerhost, google_clientId, google_clientSecret, google_accessToken, google_refreshToken} = process.env;


  /** 
  *  @param {object} mailOptions an object with properties {from, to, subject, text}
  *  @param {string} from sender of the email
  *  @param {string} to reciever of the email
  *  @param {string} subject email subject
  *  @param {string} text email text
  *  @return {object} an object with properties envelope = {}, messageId = "", response = "", raw 
  */
async function aswMailer(mailOptions){
    const mailer = nodemailer.createTransport({
        SES: { ses, aws },
    });
    
    mailer.verify((err, success)=> {
        if (err) console.error("connection to email aws err: ", err)
        else console.log("connected to email server using aws")
    });
     
    return mailer.sendMail(mailOptions); 
}

async function googleMailer(mailOptions){
    try {
        const tokens = await authenticate();
        const access_token = tokens?.access_token ?? google_accessToken;
        const refreshtoken = tokens?.refresh_token ?? google_refreshToken;
        //console.log("access token: ", tokens.access_token);
        const mailer = nodemailer.createTransport({
            host: mailerhost,
            port: 465,
            secure: true,
            secureConnection: false,  
            logger: true,
            debug: true,
            auth: {
                type: "OAuth2",
                clientId: google_clientId,
                clientSecret: google_clientSecret,
                user: gmail_email,
                refreshToken: refreshtoken,
                accessToken: access_token
            }
        });
        
        mailer.verify((err, success)=> {
            if (err) console.error("connection to email using google auth err: ", err)
            else console.log("connected to email using google auth")
        });
        return mailer.sendMail(mailOptions);
    } catch (error) {
        console.error("mailer error: ", error);
    }

};


async function cpanelMailer(mailOptions){
    try {
        const mailer = nodemailer.createTransport({
            host: email_host,
            port: 465,
            secure: true,
            secureConnection: false,  
            logger: false,
            debug: false,
            auth: {
                user: cpanel_email,
                pass: cpanel_email_pass
            }
        });
        
        mailer.verify((err, success)=> {
            if (err) console.error("connection to email using google auth err: ", err)
            else console.log("email sent - connected to email using SSL/TLS")
        });
        return mailer.sendMail(mailOptions);
    } catch (error) {
        console.error("mailer error: ", error);
    }

};

  /** 
   * slurp mailer uses SMTP to send email using mail slurp api
  *  @param {object} mailOptions an object with properties {from, to, subject, body}
  *  @param {string} from sender of the email
  *  @param {string} to reciever of the email
  *  @param {string} subject email subject
  *  @param {string} body email text
  *  @return {object} an object with properties envelope = {}, messageId = "", response = "", raw 
  */
async function slurpMailer(mailOptions){
    try {
        const server = await mailslurp.getImapSmtpAccessDetails();
        const mailer = nodemailer.createTransport({
            host: server.smtpServerHost,
            port: server.smtpServerPort,
            secure: false,
            //secureConnection: false,  
            logger: true,
            debug: false,
            auth: {
                type: "PLAIN",
                user: server.smtpUsername,
                pass: server.smtpPassword,
            },
            tls: {
              // do not fail on invalid certs
              rejectUnauthorized: false,
            },
        }); 
        
        mailer.verify((err, success)=> {
            if (err) console.error("connection to email using mail slurp err: ", err)
            else console.log("connected to email using mail slurp")
        });
        return mailer.sendMail(mailOptions);
    } catch (error) {
        console.console.error();("mailer error: ", error);
    }

};

  /** 
   * slurp mailer inbox uses create inbox to send email
  *  @param {object} mailOptions an object with properties {to, subject, body}
  *  @param {array} to array of email recievers
  *  @param {string} subject email subject
  *  @param {string} body email text
  *  @return {object} an object 
  */
async function slurpMailerinbox(mailOptions){
    try {
        const inbox = await mailslurp.createInbox();
        const mailer =  await mailslurp.sendEmail(inbox.id, mailOptions);
        return mailer;
    } catch (error) {
        console.error("mailer error: ", error);
    }

};


module.exports = {aswMailer, googleMailer, slurpMailer, slurpMailerinbox, cpanelMailer}; 