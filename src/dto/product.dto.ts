import { MinLength, IsNotEmpty } from "class-validator";

export class ProductDto {
    @IsNotEmpty({ message: 'Category ID is required' })
    categoryId?: string;

    @MinLength(5, { message: 'This field must be more than 5 character' })
    productName?: string;
}