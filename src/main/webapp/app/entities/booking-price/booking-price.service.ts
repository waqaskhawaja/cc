import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBookingPrice } from 'app/shared/model/booking-price.model';

type EntityResponseType = HttpResponse<IBookingPrice>;
type EntityArrayResponseType = HttpResponse<IBookingPrice[]>;

@Injectable({ providedIn: 'root' })
export class BookingPriceService {
    public resourceUrl = SERVER_API_URL + 'api/booking-prices';

    constructor(protected http: HttpClient) {}

    create(bookingPrice: IBookingPrice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bookingPrice);
        return this.http
            .post<IBookingPrice>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(bookingPrice: IBookingPrice): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bookingPrice);
        return this.http
            .put<IBookingPrice>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBookingPrice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBookingPrice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(bookingPrice: IBookingPrice): IBookingPrice {
        const copy: IBookingPrice = Object.assign({}, bookingPrice, {
            effectiveDate:
                bookingPrice.effectiveDate != null && bookingPrice.effectiveDate.isValid() ? bookingPrice.effectiveDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.effectiveDate = res.body.effectiveDate != null ? moment(res.body.effectiveDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((bookingPrice: IBookingPrice) => {
                bookingPrice.effectiveDate = bookingPrice.effectiveDate != null ? moment(bookingPrice.effectiveDate) : null;
            });
        }
        return res;
    }
}
