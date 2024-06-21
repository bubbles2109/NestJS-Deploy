"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
class ResponseData {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = Array.isArray(data) ? data : data ? [data] : [];
        return this;
    }
}
exports.ResponseData = ResponseData;
//# sourceMappingURL=globalClass.js.map