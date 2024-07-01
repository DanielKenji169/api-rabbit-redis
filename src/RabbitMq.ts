import * as amqp from 'amqplib/callback_api';

export class RabbitMq {
    private readonly url: string;
    private connection: amqp.Connection | null;

    constructor() {
        this.url = 'amqp://localhost';
        this.connection = null;
    }

    public async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            amqp.connect(this.url, (err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    this.connection = connection;
                    console.log('Conexão estabelecida com o RabbitMQ.');
                    resolve();
                }
            });
        });
    }

    public async sendMessage(message: any): Promise<void> {
        if (!this.connection) {
            throw new Error('Conexão com o RabbitMQ não estabelecida.');
        }

        let queueName = "jeejQ";
        const dtoAsString = JSON.stringify(message)
        
        return new Promise((resolve, reject) => {
            this.connection.createChannel((err, channel) => {
                if (err) {
                    reject(err);
                } else {
                    channel.assertQueue(queueName, { durable: true });
                    channel.sendToQueue(queueName, Buffer.from(dtoAsString));
                    console.log(`Mensagem "${dtoAsString}" enviada para a fila "${queueName}".`);
                    resolve();
                }
            });
        });
    }
    public async readMessage(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if (!this.connection) {
            reject(new Error('Conexão com o RabbitMQ não estabelecida.'));
        }

        let queueName = "jeejQ";

        this.connection.createChannel((err, channel) => {
            if (err) {
                reject(err);
            } else {
                channel.assertQueue(queueName, { durable: true });
                channel.consume(queueName, message => {
                    const messageContent = message.content.toString();
                    console.log(`Mensagem recebida da fila "${queueName}": ${messageContent}`);
                    /*channel.ack(message); */ // Confirmação manual da mensagem (opcional)
                    resolve(messageContent);
                }, {
                    noAck: true // Não requer confirmação automática da mensagem (noAck)
                });
            }
        });
    });
}

    }

