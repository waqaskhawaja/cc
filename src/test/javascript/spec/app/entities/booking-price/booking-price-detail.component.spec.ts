/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CcTestModule } from '../../../test.module';
import { BookingPriceDetailComponent } from 'app/entities/booking-price/booking-price-detail.component';
import { BookingPrice } from 'app/shared/model/booking-price.model';

describe('Component Tests', () => {
    describe('BookingPrice Management Detail Component', () => {
        let comp: BookingPriceDetailComponent;
        let fixture: ComponentFixture<BookingPriceDetailComponent>;
        const route = ({ data: of({ bookingPrice: new BookingPrice(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CcTestModule],
                declarations: [BookingPriceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BookingPriceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BookingPriceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.bookingPrice).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
