import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPurchase } from 'app/shared/model/purchase.model';

@Component({
    selector: 'jhi-purchase-detail',
    templateUrl: './purchase-detail.component.html'
})
export class PurchaseDetailComponent implements OnInit {
    purchase: IPurchase;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ purchase }) => {
            this.purchase = purchase;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
