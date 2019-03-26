/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CcTestModule } from '../../../test.module';
import { CourtDeleteDialogComponent } from 'app/entities/court/court-delete-dialog.component';
import { CourtService } from 'app/entities/court/court.service';

describe('Component Tests', () => {
    describe('Court Management Delete Component', () => {
        let comp: CourtDeleteDialogComponent;
        let fixture: ComponentFixture<CourtDeleteDialogComponent>;
        let service: CourtService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CcTestModule],
                declarations: [CourtDeleteDialogComponent]
            })
                .overrideTemplate(CourtDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CourtDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourtService);
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
