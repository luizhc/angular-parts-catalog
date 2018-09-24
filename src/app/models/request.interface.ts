export interface Request {
    uid: string;
    quantity: number;
    total: number;
    product: {
        name: string;
        unitary: number;
    };
    createdAt: string;
}
