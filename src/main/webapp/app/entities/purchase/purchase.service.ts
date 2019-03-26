import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPurchase } from 'app/shared/model/purchase.model';

type EntityResponseType = HttpResponse<IPurchase>;
type EntityArrayResponseType = HttpResponse<IPurchase[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseService {
    public resourceUrl = SERVER_API_URL + 'api/purchases';

    constructor(protected http: HttpClient) {}

    create(purchase: IPurchase): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(purchase);
        return this.http
            .post<IPurchase>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(purchase: IPurchase): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(purchase);
        return this.http
            .put<IPurchase>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPurchase>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPurchase[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(purchase: IPurchase): IPurchase {
        const copy: IPurchase = Object.assign({}, purchase, {
            purchaseDate: purchase.purchaseDate != null && purchase.purchaseDate.isValid() ? purchase.purchaseDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.purchaseDate = res.body.purchaseDate != null ? moment(res.body.purchaseDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((purchase: IPurchase) => {
                purchase.purchaseDate = purchase.purchaseDate != null ? moment(purchase.purchaseDate) : null;
            });
        }
        return res;
    }
}
