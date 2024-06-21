import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { ProductDto } from "src/dto/product.dto";
import { Product } from "src/models/product.model";
import { ProductSche } from "src/schemas/product.schema";

@Injectable()

export class ProductService {

    constructor(
        @InjectModel(ProductSche.name)
        private productModel: mongoose.Model<ProductSche>
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productModel.find()
    }

    // getProducts(): Product[] {
    //     return this.productModel
    // }

    createProducts(productDto: ProductDto): Promise<ProductDto> {
        const createdProduct = new this.productModel(productDto);
        return createdProduct.save();
    }

    getDetailProducts(id: any): Promise<Product> {
        const product = this.productModel.findById(id).exec();
        return product;
    }

    updateProducts(id: any, productDto: ProductDto): Promise<ProductDto> {
        const updatedProduct = this.productModel.findOneAndUpdate({ _id: id }, productDto, { new: true });
        return updatedProduct;
    }

    deleteProducts(id: any): Promise<any> {
        const deletedProduct = this.productModel.findByIdAndDelete(id)
        return deletedProduct
    }

}