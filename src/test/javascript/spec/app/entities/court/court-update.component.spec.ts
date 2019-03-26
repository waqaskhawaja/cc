/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CcTestModule } from '../../../test.module';
import { CourtUpdateComponent } from 'app/entities/court/court-update.component';
import { CourtService } from 'app/entities/court/court.service';
import { Court } from 'app/shared/model/court.model';

describe('Component Tests', () => {
    describe('Court Management Update Component', () => {
        let comp: CourtUpdateComponent;
        let fixture: ComponentFixture<CourtUpdateComponent>;
        let service: CourtService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CcTestModule],
                declarations: [CourtUpdateComponent]
            })
                .overrideTemplate(CourtUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CourtUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourtService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Court(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.court = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Court();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.court = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
