/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CcTestModule } from '../../../test.module';
import { BookingPriceUpdateComponent } from 'app/entities/booking-price/booking-price-update.component';
import { BookingPriceService } from 'app/entities/booking-price/booking-price.service';
import { BookingPrice } from 'app/shared/model/booking-price.model';

describe('Component Tests', () => {
    describe('BookingPrice Management Update Component', () => {
        let comp: BookingPriceUpdateComponent;
        let fixture: ComponentFixture<BookingPriceUpdateComponent>;
        let service: BookingPriceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CcTestModule],
                declarations: [BookingPriceUpdateComponent]
            })
                .overrideTemplate(BookingPriceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BookingPriceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BookingPriceService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new BookingPrice(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.bookingPrice = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new BookingPrice();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.bookingPrice = entity;
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
