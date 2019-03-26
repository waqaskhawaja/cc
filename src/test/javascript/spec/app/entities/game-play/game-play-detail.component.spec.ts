/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CcTestModule } from '../../../test.module';
import { GamePlayDetailComponent } from 'app/entities/game-play/game-play-detail.component';
import { GamePlay } from 'app/shared/model/game-play.model';

describe('Component Tests', () => {
    describe('GamePlay Management Detail Component', () => {
        let comp: GamePlayDetailComponent;
        let fixture: ComponentFixture<GamePlayDetailComponent>;
        const route = ({ data: of({ gamePlay: new GamePlay(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CcTestModule],
                declarations: [GamePlayDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GamePlayDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GamePlayDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gamePlay).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
