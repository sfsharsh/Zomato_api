const Sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY

exports.sib=function sendInBlue(email,name){
    console.log(email);
    const tranEmailApi = new Sib.TransactionalEmailsApi()
    const sender = {
        email: 'shivampathak80830@gmail.com',
        name: 'Apache',
    }
    const receivers = [
        {
            email:email
        },
    ]
    let otp = Math.floor(100000 + Math.random() * 900000);
    tranEmailApi
        .sendTransacEmail({
            sender,
            to: receivers,
            subject: 'OTP',
            htmlContent: `<p>
            Hi,</p>
           <p>${name} Please enter the following verification code to Create your Zomate Account.</p>
            <h1>${otp}</h1>
            <a href="https://cules-coding.vercel.app/">Visit</a>
                    `,
        })
        .then(console.log)
        .catch(console.log)
        
        return otp
}