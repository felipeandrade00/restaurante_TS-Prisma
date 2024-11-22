require('dotenv').config();
const fs = require('fs'); // Importação do fs
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // Inicialização do Prisma

async function importCsvData() {
  console.log('Iniciando a importação do CSV...');

  const csvData = [];

  // Lendo os dados do CSV
  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream('menu.csv')
        .pipe(csv())
        .on('data', (row) => csvData.push(row))
        .on('end', resolve)
        .on('error', reject);
    });
  } catch (error) {
    console.error('Erro ao ler o CSV:', error);
    return;
  }

  console.log('CSV lido com sucesso. Iniciando a inserção no banco de dados...');

  // Inserção no banco de dados
  try {
    for (const item of csvData) {
      // Ajuste do mapeamento de campos do CSV
      const categoria = await prisma.categoriaItem.upsert({
        where: { nome_categoria: item.item_category }, // CSV usa item_category
        update: {},
        create: {
          nome_categoria: item.item_category,
        },
      });

      await prisma.cardapioItens.create({
        data: {
          nome_item: item.item_name, // Mapeado para o campo do CSV
          descricao_item: item.item_description || null,
          preco_item: parseFloat(item.item_price), // CSV usa item_price
          vegano_bool: item.item_vegan === 'TRUE', // CSV usa item_vegan
          glutenfree_bool: item.item_glutenfree === 'TRUE', // CSV usa item_glutenfree
          id_categoria: categoria.id_categoria,
        },
      });
    }

    console.log('Dados importados com sucesso!');
  } catch (error) {
    console.error('Erro na importação para o banco de dados:', error);
  } finally {
    await prisma.$disconnect(); // Fechando a conexão com o Prisma
  }
}

// Chamada da função principal
importCsvData().catch((e) => {
  console.error('Erro inesperado:', e);
  prisma.$disconnect().finally(() => process.exit(1));
});
