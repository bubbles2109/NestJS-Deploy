import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'products', versionKey: false })
export class ProductSche {

    @Prop({ required: true })
    categoryId: string

    @Prop({ required: true })
    productName: string
}

export const ProductSchema = SchemaFactory.createForClass(ProductSche)