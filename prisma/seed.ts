import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17257',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e58',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17266',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17444',
      clientId: 'fd105551-0f0d-4a9f-bc41-c559c8a17288',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17257',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17277',
      clientId: 'fd105551-0f0d-4a9f-bc41-c559c8a17289',
      productId: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e58',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17777',
      clientId: 'fd105551-0f0d-4a9f-bc41-c559c8a17299',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17266',
    },
  ];
}

function getClients() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17288',
      name: 'John Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17289',
      name: 'Jane Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17299',
      name: 'Thomas Jefferson',
      address: 'Baker Street 12B, New York',
    },
  ];
}

async function seed() {
  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map((order) => {
      return db.order.create({
        data: {
          product: {
            connect: { id: order.productId },
          },
          client: {
            connect: { id: order.clientId },
          }
        },
      });
    }),
  );
}

seed();