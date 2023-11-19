import { Injectable } from '@nestjs/common';

import { type UpdateClothDto, type CreateClothDto } from './dto/index';

@Injectable()
export class ClothService {
  create(createClothDto: CreateClothDto) {
    return 'This action adds a new cloth';
  }

  findAll() {
    return `This action returns all cloth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cloth`;
  }

  update(id: number, updateClothDto: UpdateClothDto) {
    return `This action updates a #${id} cloth`;
  }

  remove(id: number) {
    return `This action removes a #${id} cloth`;
  }
}
