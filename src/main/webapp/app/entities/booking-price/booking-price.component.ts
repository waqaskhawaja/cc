import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBookingPrice } from 'app/shared/model/booking-price.model';
import { AccountService } from 'app/core';
import { BookingPriceService } from './booking-price.service';

@Component({
    selector: 'jhi-booking-price',
    templateUrl: './booking-price.component.html'
})
export class BookingPriceComponent implements OnInit, OnDestroy {
    bookingPrices: IBookingPrice[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected bookingPriceService: BookingPriceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.bookingPriceService
            .query()
            .pipe(
                filter((res: HttpResponse<IBookingPrice[]>) => res.ok),
                map((res: HttpResponse<IBookingPrice[]>) => res.body)
            )
            .subscribe(
                (res: IBookingPrice[]) => {
                    this.bookingPrices = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBookingPrices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBookingPrice) {
        return item.id;
    }

    registerChangeInBookingPrices() {
        this.eventSubscriber = this.eventManager.subscribe('bookingPriceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
