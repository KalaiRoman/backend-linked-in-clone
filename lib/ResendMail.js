import { Resend } from 'resend';

const resend = new Resend('re_8jNKWgbQ_4aetn7f5VaFbDofF2m5XA2bx');

const sendMail=async(email,subject,html)=>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'kalaimca685@gmail.com',
            to: [email],
            subject: subject,
            html: html?html:"<h1>Welcome too Chennai Kalaisurya...</h1>",
          });
        
          if (error) {
            return console.error({ error });
          }
          return data;
    } catch (error) {
       console.log(error); 
    }
}


export default sendMail;