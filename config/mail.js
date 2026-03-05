const mailer = require('./mailer')
const mailer_host = process.env.host;

const mail = {
    to: function(email) {
        this.email = email
        return this
    },
    
    send: async function(subject,body){
        await mailer.sendMail({
            from:mailer_host,
            to:this.email,
            subject: subject,
            text:body,
            
        })
    }     
}

module.exports = mail 