import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IBookingPrice } from 'app/shared/model/booking-price.model';
import { BookingPriceService } from './booking-price.service';

@Component({
    selector: 'jhi-booking-price-update',
    templateUrl: './booking-price-update.component.html'
})
export class BookingPriceUpdateComponent implements OnInit {
    bookingPrice: IBookingPrice;
    isSaving: boolean;
    effectiveDate: string;

    constructor(protected bookingPriceService: BookingPriceService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ bookingPrice }) => {
            this.bookingPrice = bookingPrice;
            this.effectiveDate = this.bookingPrice.effectiveDate != null ? this.bookingPrice.effectiveDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.bookingPrice.effectiveDate = this.effectiveDate != null ? moment(this.effectiveDate, DATE_TIME_FORMAT) : null;
        if (this.bookingPrice.id !== undefined) {
            this.subscribeToSaveResponse(this.bookingPriceService.update(this.bookingPrice));
        } else {
            this.subscribeToSaveResponse(this.bookingPriceService.create(this.bookingPrice));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBookingPrice>>) {
        result.subscribe((res: HttpResponse<IBookingPrice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
