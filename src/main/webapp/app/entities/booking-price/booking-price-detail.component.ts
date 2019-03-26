import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBookingPrice } from 'app/shared/model/booking-price.model';

@Component({
    selector: 'jhi-booking-price-detail',
    templateUrl: './booking-price-detail.component.html'
})
export class BookingPriceDetailComponent implements OnInit {
    bookingPrice: IBookingPrice;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bookingPrice }) => {
            this.bookingPrice = bookingPrice;
        });
    }

    previousState() {
        window.history.back();
    }
}
