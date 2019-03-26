/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CcTestModule } from '../../../test.module';
import { CourtComponent } from 'app/entities/court/court.component';
import { CourtService } from 'app/entities/court/court.service';
import { Court } from 'app/shared/model/court.model';

describe('Component Tests', () => {
    describe('Court Management Component', () => {
        let comp: CourtComponent;
        let fixture: ComponentFixture<CourtComponent>;
        let service: CourtService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CcTestModule],
                declarations: [CourtComponent],
                providers: []
            })
                .overrideTemplate(CourtComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CourtComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourtService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Court(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.courts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
