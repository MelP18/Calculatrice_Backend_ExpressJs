const mailer = require('./mailer')

const mail = {
    to: function(email) {
        this.email = email
        return this
    },
    
    send: async function(subject,body){
        await mailer.sendMail({
            from:"gsnmelp@gmail.com",
            to:this.email,
            subject: subject,
            text:body,
            
        })
    }     
}

module.exports = mail 