import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGamePlay } from 'app/shared/model/game-play.model';
import { AccountService } from 'app/core';
import { GamePlayService } from './game-play.service';

@Component({
    selector: 'jhi-game-play',
    templateUrl: './game-play.component.html'
})
export class GamePlayComponent implements OnInit, OnDestroy {
    gamePlays: IGamePlay[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected gamePlayService: GamePlayService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.gamePlayService
            .query()
            .pipe(
                filter((res: HttpResponse<IGamePlay[]>) => res.ok),
                map((res: HttpResponse<IGamePlay[]>) => res.body)
            )
            .subscribe(
                (res: IGamePlay[]) => {
                    this.gamePlays = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGamePlays();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGamePlay) {
        return item.id;
    }

    registerChangeInGamePlays() {
        this.eventSubscriber = this.eventManager.subscribe('gamePlayListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
