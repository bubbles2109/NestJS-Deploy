import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { Product } from "src/models/product.model";
import { ProductDto } from "src/dto/product.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    @UseGuards(AuthGuard())
    async getAllProducts(): Promise<ResponseData<Product[]>> {
        try {
            const products = await this.productService.findAll();
            return new ResponseData<Product[]>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, products)
        } catch (error) {
            return new ResponseData<Product[]>(HttpStatus.ERROR, HttpMessage.ERROR, null)
        }
    }
    // getProducts(): ResponseData<Product[]> {
    //     try {
    //         return new ResponseData<Product[]>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, this.productService.getProducts())
    //     } catch (error) {
    //         return new ResponseData<Product[]>(HttpStatus.ERROR, HttpMessage.ERROR, null)
    //     }
    // }

    @Post()
    async createProducts(@Body(new ValidationPipe) productDto: ProductDto): Promise<ResponseData<ProductDto>> {
        try {
            const createProduct = await this.productService.createProducts(productDto)
            return new ResponseData<ProductDto>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, createProduct)
        } catch (error) {
            return new ResponseData<ProductDto>(HttpStatus.ERROR, HttpMessage.ERROR, null)
        }
    }

    @Get('/detail')
    async getDetailProducts(@Query() param: any): Promise<ResponseData<Product>> {
        try {
            const id = param.id
            const product = await this.productService.getDetailProducts(id);
            return new ResponseData<Product>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, product)
        } catch (error) {
            return new ResponseData<Product>(HttpStatus.ERROR, HttpMessage.ERROR, null)
        }
    }

    @Put('/update')
    async updateProducts(@Query() param: any, @Body() productDto: ProductDto): Promise<ResponseData<ProductDto>> {
        try {
            const id = param.id
            const updatedProduct = await this.productService.updateProducts(id, productDto)
            return new ResponseData<ProductDto>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, updatedProduct)
        } catch (error) {
            return new ResponseData<ProductDto>(HttpStatus.ERROR, HttpMessage.ERROR, null)
        }
    }

    @Delete('/delete')
    async deleteProducts(@Query() param: any): Promise<ResponseData<Product>> {
        try {
            const id = param.id
            const deletedProduct = await this.productService.deleteProducts(id)
            return new ResponseData<Product>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, deletedProduct)
        } catch (error) {
            return new ResponseData<Product>(HttpStatus.ERROR, HttpMessage.ERROR, null)
        }
    }

}