import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGamePlay } from 'app/shared/model/game-play.model';
import { GamePlayService } from './game-play.service';

@Component({
    selector: 'jhi-game-play-delete-dialog',
    templateUrl: './game-play-delete-dialog.component.html'
})
export class GamePlayDeleteDialogComponent {
    gamePlay: IGamePlay;

    constructor(protected gamePlayService: GamePlayService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gamePlayService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gamePlayListModification',
                content: 'Deleted an gamePlay'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-play-delete-popup',
    template: ''
})
export class GamePlayDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gamePlay }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GamePlayDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.gamePlay = gamePlay;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/game-play', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/game-play', { outlets: { popup: null } }]);
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
