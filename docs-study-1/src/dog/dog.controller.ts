import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { ListAllEntities } from './dto/list.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dog')
export class DogController {
  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    console.log(`${JSON.stringify(createDogDto)} created!!!`);
    return 'This action adds a new dog';
  }

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action returns all dogs ${query.limit} items`;
  // }

  // 혹은 쿼리 key 직접 뽑을수있다!
  @Get()
  findAll(@Query('limit') limit: number) {
    return `This action returns all dogs ${limit} items`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} dog`;
  }

  @Put(':id')
  updated(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    console.log(`${JSON.stringify(updateDogDto)}의 데이터를 토대로 변경!`);
    return `This actio updates a #${id} dog`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
