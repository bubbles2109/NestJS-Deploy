/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import * as mongoose from "mongoose";
import { ProductDto } from "src/dto/product.dto";
import { Product } from "src/models/product.model";
import { ProductSche } from "src/schemas/product.schema";
export declare class ProductService {
    private productModel;
    constructor(productModel: mongoose.Model<ProductSche>);
    findAll(): Promise<Product[]>;
    createProducts(productDto: ProductDto): Promise<ProductDto>;
    getDetailProducts(id: any): Promise<Product>;
    updateProducts(id: any, productDto: ProductDto): Promise<ProductDto>;
    deleteProducts(id: any): Promise<any>;
}
