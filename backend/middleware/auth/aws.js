const aws = require("@aws-sdk/client-ses");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");

const ses = new aws.SES({
    apiVersion: "2012-10-17",
    region: "us-east-2",
    defaultProvider,
});


/*

{
     "Version": "2012-10-17",
     "Statement": [
          {
               "Sid": "stmt1693703364426",
               "Effect": "ALLOW",
               "Resource": "arn:aws:ses:us-east-2:615964470501:identity/ken.acer19@yahoo.com",
               "Action": [
                    "ses:SendRawEmail",
                    "ses:SendEmail"
               ],
               "Principal": {
                    "AWS": [
                         "arn:aws:iam::615964470501:user/test-email-user"
                    ]
               },
               "Condition": {}
          }
     ]
}*/


module.exports = {
    ses,
    aws,
};