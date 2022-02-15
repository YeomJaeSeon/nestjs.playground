import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';
import { Cat, CreateCatDto } from './dtos/create-cats.dto';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService){}

    @Post()
    async create(@Body() createCatDto: CreateCatDto){
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]>{
        return this.catsService.findAll()
    }
}
  