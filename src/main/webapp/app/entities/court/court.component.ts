import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICourt } from 'app/shared/model/court.model';
import { AccountService } from 'app/core';
import { CourtService } from './court.service';

@Component({
    selector: 'jhi-court',
    templateUrl: './court.component.html'
})
export class CourtComponent implements OnInit, OnDestroy {
    courts: ICourt[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected courtService: CourtService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.courtService
            .query()
            .pipe(
                filter((res: HttpResponse<ICourt[]>) => res.ok),
                map((res: HttpResponse<ICourt[]>) => res.body)
            )
            .subscribe(
                (res: ICourt[]) => {
                    this.courts = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCourts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICourt) {
        return item.id;
    }

    registerChangeInCourts() {
        this.eventSubscriber = this.eventManager.subscribe('courtListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
