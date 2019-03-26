import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'court',
                loadChildren: './court/court.module#CcCourtModule'
            },
            {
                path: 'booking-price',
                loadChildren: './booking-price/booking-price.module#CcBookingPriceModule'
            },
            {
                path: 'game-play',
                loadChildren: './game-play/game-play.module#CcGamePlayModule'
            },
            {
                path: 'game-play',
                loadChildren: './game-play/game-play.module#CcGamePlayModule'
            },
            {
                path: 'game-play',
                loadChildren: './game-play/game-play.module#CcGamePlayModule'
            },
            {
                path: 'game-play',
                loadChildren: './game-play/game-play.module#CcGamePlayModule'
            },
            {
                path: 'game-play',
                loadChildren: './game-play/game-play.module#CcGamePlayModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CcEntityModule {}
