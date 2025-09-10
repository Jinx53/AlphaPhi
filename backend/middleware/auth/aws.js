const aws = require("@aws-sdk/client-ses");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");

const ses = new aws.SES({
    apiVersion: "2012-10-17",
    region: "us-east-2",
    defaultProvider,
});


module.exports = {
    ses,
    aws,
};