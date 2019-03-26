import { Moment } from 'moment';

export interface IBookingPrice {
    id?: number;
    bookingPrice?: number;
    effectiveDate?: Moment;
}

export class BookingPrice implements IBookingPrice {
    constructor(public id?: number, public bookingPrice?: number, public effectiveDate?: Moment) {}
}
