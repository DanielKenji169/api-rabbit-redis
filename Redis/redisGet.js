const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const redis = require('redis');
     const client = redis.createClient();
     client.connect();
// async function test(){

//     const redis = require('redis');
//     const client = redis.createClient();
//     client.connect();

//     const result = await client.get("1");
//     const parsedResult = JSON.parse(result);
//     console.log(parsedResult);

//     const parametro = parsedResult.title
//     console.log(parametro)
//     client.quit();
// }
// test();

async function loadDataToRedis() {
    try {
        const records = await prisma.books.findMany();
        console.log(`Encontrados ${records.length} registros na tabela.`);

        for (const record of records) {
            const id = record.id;
            const dados = JSON.stringify(record);

            await client.set(id.toString(), dados);
            console.log(`Inserido no Redis: ${id}`);
        }
        console.log('Dados carregados no Redis com sucesso.');
    } catch (error) {
        console.error('Erro ao buscar dados no Prisma:', error);
    }
}
loadDataToRedis();