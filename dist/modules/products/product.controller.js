"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const globalClass_1 = require("../../global/globalClass");
const globalEnum_1 = require("../../global/globalEnum");
const product_dto_1 = require("../../dto/product.dto");
const passport_1 = require("@nestjs/passport");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getAllProducts() {
        try {
            const products = await this.productService.findAll();
            return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS, products);
        }
        catch (error) {
            return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR, null);
        }
    }
    async createProducts(productDto) {
        try {
            const createProduct = await this.productService.createProducts(productDto);
            return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS, createProduct);
        }
        catch (error) {
            return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR, null);
        }
    }
    async getDetailProducts(param) {
        try {
            const id = param.id;
            const product = await this.productService.getDetailProducts(id);
            return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS, product);
        }
        catch (error) {
            return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR, null);
        }
    }
    async updateProducts(param, productDto) {
        try {
            const id = param.id;
            const updatedProduct = await this.productService.updateProducts(id, productDto);
            return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS, updatedProduct);
        }
        catch (error) {
            return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR, null);
        }
    }
    async deleteProducts(param) {
        try {
            const id = param.id;
            const deletedProduct = await this.productService.deleteProducts(id);
            return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.SUCCESS, globalEnum_1.HttpMessage.SUCCESS, deletedProduct);
        }
        catch (error) {
            return new globalClass_1.ResponseData(globalEnum_1.HttpStatus.ERROR, globalEnum_1.HttpMessage.ERROR, null);
        }
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProducts", null);
__decorate([
    (0, common_1.Get)('/detail'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getDetailProducts", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProducts", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProducts", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map