import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CcSharedModule } from 'app/shared';
import {
    BookingPriceComponent,
    BookingPriceDetailComponent,
    BookingPriceUpdateComponent,
    BookingPriceDeletePopupComponent,
    BookingPriceDeleteDialogComponent,
    bookingPriceRoute,
    bookingPricePopupRoute
} from './';

const ENTITY_STATES = [...bookingPriceRoute, ...bookingPricePopupRoute];

@NgModule({
    imports: [CcSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BookingPriceComponent,
        BookingPriceDetailComponent,
        BookingPriceUpdateComponent,
        BookingPriceDeleteDialogComponent,
        BookingPriceDeletePopupComponent
    ],
    entryComponents: [
        BookingPriceComponent,
        BookingPriceUpdateComponent,
        BookingPriceDeleteDialogComponent,
        BookingPriceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CcBookingPriceModule {}
