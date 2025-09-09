const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const path = require('path');
const config = require("../../config/googleservice.json");
const google_key =  path.resolve(__dirname, "../../config/googleservice.json");
require('dotenv');
const {google_service_private_key, google_service_client_email} = process.env;

const scopes = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send',
];

const jwtClient = new google.auth.JWT({
    email: google_service_client_email,
    key: google_service_private_key,
    scopes: scopes
});


async function getAccessToken(){
    try {
        const client = new GoogleAuth({
            keyFile: google_key,
            scopes: scopes
        })
        const accessToken = await client.getAccessToken();
        return accessToken;
        
    } catch (error) {
        console.error("get auth error: ", error);
    }

}

function makeEmail({from, to, subject, text}){
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const emailLines = [];
    emailLines.push(`From: ${from}`);
    emailLines.push(`To: ${to}`);
    emailLines.push(`Subject: ${utf8Subject}`);
    emailLines.push("Content-Type: text/html; charset=utf-8");
    emailLines.push("MIME-Version: 1.0");
    emailLines.push("");
    emailLines.push(text);
    const message = emailLines.join("\n");
    const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
    return encodedMessage;
}
//Send work doesn't work because the email is not a service account - code is correct
async function sendEmail(mailOptions = {from, to, subject, text}) {

    const gmail = google.gmail({version: 'v1', auth: jwtClient});

    const message = makeEmail(mailOptions);
    try {
        const res = await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: message
            }
        });
        const {data} = res;
        //console.log("send email data: ", data);
        return data
    } catch (error) {
        console.error("get send email error: ", error);
    }
}

async function authenticate() {
    try {
        const tokens = await jwtClient.authorize();
        return {access_token, token_type, expiry_date, id_token, refresh_token} = tokens;
    } catch (error) {
        console.error("authenticate error: ", error);
    }
}

module.exports = {
    authenticate,
    sendEmail: sendEmail,
    getAccessToken: getAccessToken,
};