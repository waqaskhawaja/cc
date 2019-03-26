import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CcSharedModule } from 'app/shared';
import {
    GamePlayComponent,
    GamePlayDetailComponent,
    GamePlayUpdateComponent,
    GamePlayDeletePopupComponent,
    GamePlayDeleteDialogComponent,
    gamePlayRoute,
    gamePlayPopupRoute
} from './';

const ENTITY_STATES = [...gamePlayRoute, ...gamePlayPopupRoute];

@NgModule({
    imports: [CcSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GamePlayComponent,
        GamePlayDetailComponent,
        GamePlayUpdateComponent,
        GamePlayDeleteDialogComponent,
        GamePlayDeletePopupComponent
    ],
    entryComponents: [GamePlayComponent, GamePlayUpdateComponent, GamePlayDeleteDialogComponent, GamePlayDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CcGamePlayModule {}
