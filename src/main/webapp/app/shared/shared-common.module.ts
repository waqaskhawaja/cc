import { NgModule } from '@angular/core';

import { CcSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [CcSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [CcSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class CcSharedCommonModule {}
