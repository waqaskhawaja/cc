/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CcTestModule } from '../../../test.module';
import { GamePlayDeleteDialogComponent } from 'app/entities/game-play/game-play-delete-dialog.component';
import { GamePlayService } from 'app/entities/game-play/game-play.service';

describe('Component Tests', () => {
    describe('GamePlay Management Delete Component', () => {
        let comp: GamePlayDeleteDialogComponent;
        let fixture: ComponentFixture<GamePlayDeleteDialogComponent>;
        let service: GamePlayService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CcTestModule],
                declarations: [GamePlayDeleteDialogComponent]
            })
                .overrideTemplate(GamePlayDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GamePlayDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GamePlayService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
