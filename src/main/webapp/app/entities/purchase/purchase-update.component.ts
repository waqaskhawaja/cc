import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';
import { IPurchase } from 'app/shared/model/purchase.model';
import { PurchaseService } from './purchase.service';

@Component({
    selector: 'jhi-purchase-update',
    templateUrl: './purchase-update.component.html'
})
export class PurchaseUpdateComponent implements OnInit {
    purchase: IPurchase;
    isSaving: boolean;
    purchaseDate: string;

    constructor(protected dataUtils: JhiDataUtils, protected purchaseService: PurchaseService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ purchase }) => {
            this.purchase = purchase;
            this.purchaseDate = this.purchase.purchaseDate != null ? this.purchase.purchaseDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.purchase.purchaseDate = this.purchaseDate != null ? moment(this.purchaseDate, DATE_TIME_FORMAT) : null;
        if (this.purchase.id !== undefined) {
            this.subscribeToSaveResponse(this.purchaseService.update(this.purchase));
        } else {
            this.subscribeToSaveResponse(this.purchaseService.create(this.purchase));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchase>>) {
        result.subscribe((res: HttpResponse<IPurchase>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
