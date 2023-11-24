import { PrismaClient } from '@prisma/client';
import { promises as fsPromises } from 'fs';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const salt = bcrypt.genSaltSync(12);

export const tailor = async () => {
  try {
    const data = await fsPromises.readFile(
      __dirname + '/data/tailor.tsv',
      'utf8',
    );

    const rows = data.split('\n');

    for (const row of rows) {
      if (row.startsWith('email') || row === '') {
        continue;
      }
      const [
        email,
        username,
        password,
        nama,
        deskripsi,
        rating,
        geo,
        alamat,
        opening_time,
        closing_time,
        open_days,
        nomor,
        gambar_1,
        gambar_2,
        gambar_3,
        gambar_4,
        gambar_5,
        gambar_6,
      ] = row.split('\t');

      let images = [];
      if (gambar_1 !== '') {
        images.push(gambar_1.trim());
      }
      if (gambar_2 !== '') {
        images.push(gambar_2.trim());
      }
      if (gambar_3 !== '') {
        images.push(gambar_3.trim());
      }
      if (gambar_4 !== '') {
        images.push(gambar_4.trim());
      }
      if (gambar_5 !== '') {
        images.push(gambar_5.trim());
      }
      if (gambar_6 !== '') {
        images.push(gambar_6.trim());
      }

      const user = await prisma.users.upsert({
        where: {
          email,
        },
        update: {},
        create: {
          email: email.trim(),
          username: username.trim(),
          password: bcrypt.hashSync(password.trim(), salt),
          role: 'TAILOR',
          phone_number: nomor.trim(),
        },
      });

      const [longitude, latitude] = geo.split(',');

      let open;
      switch (open_days.trim()) {
        case '5':
          open = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
          break;
        case '6':
          open = [
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
            'SATURDAY',
          ];
          break;
        case '7':
          open = [
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
            'SATURDAY',
            'SUNDAY',
          ];
          break;

        default:
          break;
      }

      const tailor = await prisma.tailors.upsert({
        where: {
          user_id: user.id,
        },
        update: {},
        create: {
          name: nama.trim(),
          description: deskripsi.trim(),
          rating: parseInt(rating.trim()),
          latitude: latitude.trim(),
          longitude: longitude.trim(),
          address: alamat.trim(),
          opening_time: opening_time.trim(),
          closing_time: closing_time.trim(),
          open_days: open,
          Users: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      for (const image of images) {
        if (image === '') continue;
        await prisma.tailorImage.create({
          data: {
            image_url: image,
            Tailors: {
              connect: {
                id: tailor.id,
              },
            },
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
