import { PartialType } from '@nestjs/swagger';
import { CreateClothDto } from './create-cloth.dto';

export class UpdateClothDto extends PartialType(CreateClothDto) {}
