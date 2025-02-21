const { gmailTransporter } = require("../../../config/nodemailer");


const sendMailUtility=async({email,subject,text,html})=>{
    if(!email){
        console.log("---Email is required for sending mail");
        return [false,"Invalid Email"];
    }
    if(!text & !html){
        console.log("--Either text or html required");
        return [false,"Invalid Email"];
    }
    try{
const info = await gmailTransporter.sendMail({
    from: 'TECHSPHERE" <techsphere@gmail.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  return [true];
} //IFFI
catch(err)
{
    console.log("---Message NOT sent for email:",email);
    if(err.message === "No recipients defined"){
        return [false,"Invalid email! Please recheck your mail id."];
    }
    return [false,err.message];
}
};
module.exports={sendMailUtility};
