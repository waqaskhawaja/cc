/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CcTestModule } from '../../../test.module';
import { GamePlayComponent } from 'app/entities/game-play/game-play.component';
import { GamePlayService } from 'app/entities/game-play/game-play.service';
import { GamePlay } from 'app/shared/model/game-play.model';

describe('Component Tests', () => {
    describe('GamePlay Management Component', () => {
        let comp: GamePlayComponent;
        let fixture: ComponentFixture<GamePlayComponent>;
        let service: GamePlayService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CcTestModule],
                declarations: [GamePlayComponent],
                providers: []
            })
                .overrideTemplate(GamePlayComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GamePlayComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GamePlayService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GamePlay(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gamePlays[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
