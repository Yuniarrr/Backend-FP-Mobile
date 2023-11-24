import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { tailor } from './tailor';

const prisma = new PrismaClient();

const salt = bcrypt.genSaltSync(12);

async function seedUsers() {
  await prisma.users.createMany({
    data: [
      {
        email: 'user@example.com',
        password: bcrypt.hashSync('password', salt),
        username: 'John Doe',
        role: 'USER',
      },
      {
        email: 'tailor@example.com',
        password: bcrypt.hashSync('password', salt),
        username: 'Tailor',
        role: 'TAILOR',
        phone_number: '1234567890',
      },
    ],
  });
}

async function seedTailor() {
  const user = await prisma.users.findUnique({
    where: {
      email: 'tailor@example.com',
    },
  });

  await prisma.tailors.upsert({
    where: {
      user_id: user.id,
    },
    update: {},
    create: {
      name: 'Tailor',
      description: 'This is a tailor',
      address: '1234 Tailor Street',
      closing_time: '17:00:00',
      opening_time: '09:00:00',
      open_days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
      Users: {
        connect: {
          id: user.id,
        },
      },
    },
  });
}

async function seedOrder() {
  const user = await prisma.users.findUnique({
    where: {
      email: 'user@example.com',
    },
  });

  const tailor = await prisma.users.findUnique({
    where: {
      email: 'tailor@example.com',
    },
    include: {
      Tailors: true,
    },
  });

  const payment_method = await prisma.paymentMethods.findFirst({
    where: {
      name: 'Cash',
    },
  });

  await prisma.orderItems.create({
    data: {
      Orders: {
        create: {
          order_date: new Date(),
          user_id: user.id,
          tailor_id: tailor.Tailors[0].id,
          delivery_address: '1234 Tailor Street',
          Payment: {
            create: {
              due_date: new Date(),
              status: 'AWAITING',
              price: 1000,
              PaymentMethods: {
                connect: {
                  id: payment_method.id,
                },
              },
            },
          },
        },
      },
      Clothes: {
        create: {
          name: 'Shirt',
          price: 1000,
          description: 'This is a shirt',
          quantity: 1,
        },
      },
    },
  });
}

async function seedPaymentMethods() {
  await prisma.paymentMethods.createMany({
    data: [
      {
        name: 'Cash',
      },
      {
        name: 'OVO',
      },
      {
        name: 'Gopay',
      },
    ],
  });
}

const main = async () => {
  await prisma.orderItems.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orders.deleteMany();
  await prisma.clothes.deleteMany();
  await prisma.paymentMethods.deleteMany();
  await prisma.tailorImage.deleteMany();
  await prisma.tailors.deleteMany();
  await prisma.users.deleteMany();

  await seedPaymentMethods();
  await seedUsers();
  await seedTailor();
  await tailor();
  await seedOrder();
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
