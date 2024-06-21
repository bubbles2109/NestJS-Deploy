import { ProductService } from "./product.service";
import { ResponseData } from "src/global/globalClass";
import { Product } from "src/models/product.model";
import { ProductDto } from "src/dto/product.dto";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<ResponseData<Product[]>>;
    createProducts(productDto: ProductDto): Promise<ResponseData<ProductDto>>;
    getDetailProducts(param: any): Promise<ResponseData<Product>>;
    updateProducts(param: any, productDto: ProductDto): Promise<ResponseData<ProductDto>>;
    deleteProducts(param: any): Promise<ResponseData<Product>>;
}
