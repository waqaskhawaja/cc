import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICourt } from 'app/shared/model/court.model';
import { CourtService } from './court.service';

@Component({
    selector: 'jhi-court-delete-dialog',
    templateUrl: './court-delete-dialog.component.html'
})
export class CourtDeleteDialogComponent {
    court: ICourt;

    constructor(protected courtService: CourtService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.courtService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'courtListModification',
                content: 'Deleted an court'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-court-delete-popup',
    template: ''
})
export class CourtDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ court }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CourtDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.court = court;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/court', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/court', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
