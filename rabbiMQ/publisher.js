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
        let message ="jeej";

        channel.assertQueue(queueName,{
            durable: false
        });
        channel.sendToQueue(queueName, Buffer.from(message));

        console.log("Message : " + message);
        setTimeout(()=> {
            connection.close();
        }, 1000)

    })
})
