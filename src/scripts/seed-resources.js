const { Resource } = require('../models');
const { sequelize } = require('../config/database');

async function seedResources() {
  try {
    await sequelize.sync();

    const resources = [
      {
        name: 'Lista de Procedimentos',
        type: 'document',
        url: 'https://sua-clinica.com/docs/procedimentos.pdf',
        description: 'Conheça todos os nossos procedimentos estéticos',
        tags: ['procedimentos'],
        metadata: {
          categories: [
            'Facial',
            'Corporal',
            'Tratamentos a Laser',
            'Harmonização Facial'
          ]
        }
      },
      {
        name: 'Tabela de Preços',
        type: 'document',
        url: 'https://sua-clinica.com/docs/precos.pdf',
        description: 'Tabela de preços atualizada dos nossos procedimentos',
        tags: ['precos'],
        metadata: {
          validUntil: '2024-12-31'
        }
      },
      {
        name: 'Localização',
        type: 'link',
        url: 'https://maps.google.com/?q=sua-clinica',
        description: 'Encontre nossa clínica no Google Maps',
        tags: ['localizacao'],
        metadata: {
          address: 'Rua Exemplo, 123 - Centro',
          city: 'São Paulo',
          state: 'SP',
          coordinates: {
            lat: -23.550520,
            lng: -46.633308
          }
        }
      },
      {
        name: 'Antes e Depois',
        type: 'document',
        url: 'https://sua-clinica.com/docs/resultados.pdf',
        description: 'Veja os resultados dos nossos procedimentos',
        tags: ['resultados'],
        metadata: {
          procedures: [
            'Botox',
            'Preenchimento',
            'Limpeza de Pele',
            'Harmonização Facial'
          ]
        }
      }
    ];

    for (const resource of resources) {
      await Resource.create(resource);
    }

    console.log('Resources seeded successfully');
  } catch (error) {
    console.error('Error seeding resources:', error);
  } finally {
    await sequelize.close();
  }
}

seedResources();