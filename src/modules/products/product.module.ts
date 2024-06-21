import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSche, ProductSchema } from "src/schemas/product.schema";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: ProductSche.name, schema: ProductSchema }])
    ],
    controllers: [ProductController],
    providers: [ProductService]
})

export class ProductModule {}