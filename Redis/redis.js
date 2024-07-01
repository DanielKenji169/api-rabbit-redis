const {PrismaClient} = require('@prisma/client');
const redis = require('redis');

const prisma = new PrismaClient();

const client = redis.createClient();
client.on('error', (err) => {
    console.error('Erro ao conectar ao Redis:', err);
});

// async function testePrisma(){
//     const records = await prisma.books.findMany();

//     console.log(records)
// }
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
        client.quit();  // Certifique-se de fechar o cliente Redis em caso de erro também
    }
}

testeSet(1);

// async function loadDataToRedis(){
//     try{
//         const records = await prisma.books.findMany();

//         for(const record of records){
//             const id = record.id;
//             const dados = JSON.stringify(record);
//             // console.log(dados);

//             client.set(id,dados, (err, reply) => {
//                 if(err) {
//                     console.error('Erro ao insesir no Redis:', err);
//                 } else{
//                     console.log('Inserido no Redis: ${id}');
//                 }
//             });
//         }
//         console.log('Dados carregados no Redis com sucesso.');

//     } catch(error){
//         console.error('Erro ao buscar dados no Prisma:', error);
//     } finally{
//         await prisma.$disconnect();
//         redisClient.quit();
//     }
// }

// loadDataToRedis();

/*async function testRedis(){
    const client = redis.createClient();
    client.connect();

    const result = await client.set("jooj", "jeej");
    console.log(result);
}

testRedis();*/