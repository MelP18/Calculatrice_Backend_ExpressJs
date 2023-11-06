const mailer = require('./mailer')

const mail = {
    to: function(email) {
        this.email = email
        return this
    },
    
    send: async function(subject,body, code){
        await mailer.sendMail({
            from:"no_reply@gmail.com",
            to:this.email,
            subject: subject,
            text:body + code   ,
            
        })
    }     
}

module.exports = mail 