import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICourt } from 'app/shared/model/court.model';

type EntityResponseType = HttpResponse<ICourt>;
type EntityArrayResponseType = HttpResponse<ICourt[]>;

@Injectable({ providedIn: 'root' })
export class CourtService {
    public resourceUrl = SERVER_API_URL + 'api/courts';

    constructor(protected http: HttpClient) {}

    create(court: ICourt): Observable<EntityResponseType> {
        return this.http.post<ICourt>(this.resourceUrl, court, { observe: 'response' });
    }

    update(court: ICourt): Observable<EntityResponseType> {
        return this.http.put<ICourt>(this.resourceUrl, court, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICourt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICourt[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
