import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGamePlay } from 'app/shared/model/game-play.model';

type EntityResponseType = HttpResponse<IGamePlay>;
type EntityArrayResponseType = HttpResponse<IGamePlay[]>;

@Injectable({ providedIn: 'root' })
export class GamePlayService {
    public resourceUrl = SERVER_API_URL + 'api/game-plays';

    constructor(protected http: HttpClient) {}

    create(gamePlay: IGamePlay): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gamePlay);
        return this.http
            .post<IGamePlay>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(gamePlay: IGamePlay): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(gamePlay);
        return this.http
            .put<IGamePlay>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGamePlay>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGamePlay[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(gamePlay: IGamePlay): IGamePlay {
        const copy: IGamePlay = Object.assign({}, gamePlay, {
            gamePlaySlot: gamePlay.gamePlaySlot != null && gamePlay.gamePlaySlot.isValid() ? gamePlay.gamePlaySlot.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.gamePlaySlot = res.body.gamePlaySlot != null ? moment(res.body.gamePlaySlot) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((gamePlay: IGamePlay) => {
                gamePlay.gamePlaySlot = gamePlay.gamePlaySlot != null ? moment(gamePlay.gamePlaySlot) : null;
            });
        }
        return res;
    }
}
