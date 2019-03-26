import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BookingPrice } from 'app/shared/model/booking-price.model';
import { BookingPriceService } from './booking-price.service';
import { BookingPriceComponent } from './booking-price.component';
import { BookingPriceDetailComponent } from './booking-price-detail.component';
import { BookingPriceUpdateComponent } from './booking-price-update.component';
import { BookingPriceDeletePopupComponent } from './booking-price-delete-dialog.component';
import { IBookingPrice } from 'app/shared/model/booking-price.model';

@Injectable({ providedIn: 'root' })
export class BookingPriceResolve implements Resolve<IBookingPrice> {
    constructor(private service: BookingPriceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBookingPrice> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<BookingPrice>) => response.ok),
                map((bookingPrice: HttpResponse<BookingPrice>) => bookingPrice.body)
            );
        }
        return of(new BookingPrice());
    }
}

export const bookingPriceRoute: Routes = [
    {
        path: '',
        component: BookingPriceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BookingPrices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: BookingPriceDetailComponent,
        resolve: {
            bookingPrice: BookingPriceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BookingPrices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: BookingPriceUpdateComponent,
        resolve: {
            bookingPrice: BookingPriceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BookingPrices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: BookingPriceUpdateComponent,
        resolve: {
            bookingPrice: BookingPriceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BookingPrices'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bookingPricePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: BookingPriceDeletePopupComponent,
        resolve: {
            bookingPrice: BookingPriceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BookingPrices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
