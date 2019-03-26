import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBookingPrice } from 'app/shared/model/booking-price.model';
import { BookingPriceService } from './booking-price.service';

@Component({
    selector: 'jhi-booking-price-delete-dialog',
    templateUrl: './booking-price-delete-dialog.component.html'
})
export class BookingPriceDeleteDialogComponent {
    bookingPrice: IBookingPrice;

    constructor(
        protected bookingPriceService: BookingPriceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bookingPriceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bookingPriceListModification',
                content: 'Deleted an bookingPrice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-booking-price-delete-popup',
    template: ''
})
export class BookingPriceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bookingPrice }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BookingPriceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.bookingPrice = bookingPrice;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/booking-price', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/booking-price', { outlets: { popup: null } }]);
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
