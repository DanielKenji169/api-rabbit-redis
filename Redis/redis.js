const {PrismaClient} = require('@prisma/client');
const redis = require('redis');

const prisma = new PrismaClient();

const client = redis.createClient();
client.on('error', (err) => {
    console.error('Erro ao conectar ao Redis:', err);
});

async function testeSet(id) {
    try {

        await client.connect();
        
        const teste = await prisma.books.findUniqueOrThrow({
            where: {
                id,
            },
        });
        console.log('Dados do Prisma:', teste);

        const idRedis = teste.id;
        const dados = JSON.stringify(teste);

        client.set(idRedis.toString(), dados, (err, reply) => {
            if (err) {
                console.error('Erro ao inserir no Redis:', err);
            } else {
                console.log(`Inserido no Redis: ${reply}`);
            }
            client.quit();
        });
    } catch (error) {
        console.error('Erro ao buscar o livro:', error);
        client.quit();  
    }
}

testeSet(1);
