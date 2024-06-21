export class Product {
    id?: any;
    categoryId?: string;
    productName?: string;
    
    constructor({id, categoryId, productName}) {
        if (id !== null) this.id = id
        if (categoryId !== null) this.categoryId = categoryId
        if (productName !== null) this.productName = productName
    }
}