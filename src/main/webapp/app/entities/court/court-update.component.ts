import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICourt } from 'app/shared/model/court.model';
import { CourtService } from './court.service';

@Component({
    selector: 'jhi-court-update',
    templateUrl: './court-update.component.html'
})
export class CourtUpdateComponent implements OnInit {
    court: ICourt;
    isSaving: boolean;

    constructor(protected courtService: CourtService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ court }) => {
            this.court = court;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.court.id !== undefined) {
            this.subscribeToSaveResponse(this.courtService.update(this.court));
        } else {
            this.subscribeToSaveResponse(this.courtService.create(this.court));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourt>>) {
        result.subscribe((res: HttpResponse<ICourt>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
