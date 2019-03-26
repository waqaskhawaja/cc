/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CcTestModule } from '../../../test.module';
import { BookingPriceComponent } from 'app/entities/booking-price/booking-price.component';
import { BookingPriceService } from 'app/entities/booking-price/booking-price.service';
import { BookingPrice } from 'app/shared/model/booking-price.model';

describe('Component Tests', () => {
    describe('BookingPrice Management Component', () => {
        let comp: BookingPriceComponent;
        let fixture: ComponentFixture<BookingPriceComponent>;
        let service: BookingPriceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CcTestModule],
                declarations: [BookingPriceComponent],
                providers: []
            })
                .overrideTemplate(BookingPriceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BookingPriceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingPriceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BookingPrice(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.bookingPrices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
