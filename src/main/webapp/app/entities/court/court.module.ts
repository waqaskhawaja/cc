import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CcSharedModule } from 'app/shared';
import {
    CourtComponent,
    CourtDetailComponent,
    CourtUpdateComponent,
    CourtDeletePopupComponent,
    CourtDeleteDialogComponent,
    courtRoute,
    courtPopupRoute
} from './';

const ENTITY_STATES = [...courtRoute, ...courtPopupRoute];

@NgModule({
    imports: [CcSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CourtComponent, CourtDetailComponent, CourtUpdateComponent, CourtDeleteDialogComponent, CourtDeletePopupComponent],
    entryComponents: [CourtComponent, CourtUpdateComponent, CourtDeleteDialogComponent, CourtDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CcCourtModule {}
