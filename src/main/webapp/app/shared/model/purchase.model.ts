import { Moment } from 'moment';

export interface IPurchase {
    id?: number;
    purchaseDate?: Moment;
    price?: number;
    attachmentContentType?: string;
    attachment?: any;
}

export class Purchase implements IPurchase {
    constructor(
        public id?: number,
        public purchaseDate?: Moment,
        public price?: number,
        public attachmentContentType?: string,
        public attachment?: any
    ) {}
}
