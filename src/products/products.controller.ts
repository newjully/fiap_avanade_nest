import { Controller, Post, Get, Patch, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateProductDTO } from './dto/creatProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // criar (POST) um novo produto
    @Post()
    create(@Body() req:CreateProductDTO){
        return this.productsService.create();
    }

    // listar todos  (GET) localhost:3000/products
    @Get()
    findAll(){
        return this.productsService.findAll();
    }

    // listar um  (GET) localhost:3000/products/1
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: number) {
        return this.productsService.findOne(+id);
    }

    // atualizar  (PUT) ou (PATCH) localhost:3000/products/1
    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: number,
    @Body() req:UpdateProductDTO) {
        return this.productsService.update(+id, req);
    }

    // deletar  (DELETE)

}

