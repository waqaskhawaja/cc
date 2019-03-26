import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IPayment {
    id?: number;
    paymentDate?: Moment;
    amount?: number;
    sender?: IUser;
    recipient?: IUser;
}

export class Payment implements IPayment {
    constructor(public id?: number, public paymentDate?: Moment, public amount?: number, public sender?: IUser, public recipient?: IUser) {}
}
