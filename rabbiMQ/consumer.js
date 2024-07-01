const amqp = require('amqplib/callback_api');
const url = 'amqp://localhost'

amqp.connect(url,(err, connection) => {
    if(err){
        throw err;
    }
    connection.createChannel((err, channel) =>{
        if(err){
            throw err;
        }
        let queueName = "kibeQ";
        
        channel.assertQueue(queueName,{
            durable : false
        });
            
        channel.consume("kibeQ", message =>{
            console.log(message.content.toString());
        },{
            noAck: true
        })
    })
    
})
