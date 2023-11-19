import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from 'auth/guards/jwt.guard';

import { ClothService } from './cloth.service';
import { CreateClothDto, UpdateClothDto } from './dto/index';

@ApiTags('Cloth')
@Controller('cloth')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class ClothController {
  constructor(private readonly clothService: ClothService) {}

  @ApiOkResponse({
    description: 'Create new cloth.',
  })
  @Post()
  create(@Body() createClothDto: CreateClothDto) {
    return this.clothService.create(createClothDto);
  }

  @ApiOkResponse({
    description: 'Get all cloths.',
  })
  @Get()
  findAll() {
    return this.clothService.findAll();
  }

  @ApiOkResponse({
    description: 'Get cloth by id.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Update cloth by id.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClothDto: UpdateClothDto) {
    return this.clothService.update(+id, updateClothDto);
  }

  @ApiOkResponse({
    description: 'Delete cloth by id.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clothService.remove(+id);
  }
}
