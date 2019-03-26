import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IGamePlay } from 'app/shared/model/game-play.model';
import { GamePlayService } from './game-play.service';
import { ICourt } from 'app/shared/model/court.model';
import { CourtService } from 'app/entities/court';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-game-play-update',
    templateUrl: './game-play-update.component.html'
})
export class GamePlayUpdateComponent implements OnInit {
    gamePlay: IGamePlay;
    isSaving: boolean;

    courts: ICourt[];

    users: IUser[];
    gamePlaySlot: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected gamePlayService: GamePlayService,
        protected courtService: CourtService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gamePlay }) => {
            this.gamePlay = gamePlay;
            this.gamePlaySlot = this.gamePlay.gamePlaySlot != null ? this.gamePlay.gamePlaySlot.format(DATE_TIME_FORMAT) : null;
        });
        this.courtService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICourt[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICourt[]>) => response.body)
            )
            .subscribe((res: ICourt[]) => (this.courts = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.gamePlay.gamePlaySlot = this.gamePlaySlot != null ? moment(this.gamePlaySlot, DATE_TIME_FORMAT) : null;
        if (this.gamePlay.id !== undefined) {
            this.subscribeToSaveResponse(this.gamePlayService.update(this.gamePlay));
        } else {
            this.subscribeToSaveResponse(this.gamePlayService.create(this.gamePlay));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGamePlay>>) {
        result.subscribe((res: HttpResponse<IGamePlay>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCourtById(index: number, item: ICourt) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    getUserFullName(item: IUser) {
        if (item.firstName && item.lastName) {
            return item.firstName + ' ' + item.lastName;
        } else if (item.firstName) {
            return item.firstName;
        } else {
            return item.login;
        }
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
