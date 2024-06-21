export declare class ResponseData<D> {
    statusCode: number;
    message: string;
    data: D | D[];
    constructor(statusCode: number, message: string, data: D | D[]);
}
