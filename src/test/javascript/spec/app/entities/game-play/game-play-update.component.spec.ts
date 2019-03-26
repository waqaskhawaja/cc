/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CcTestModule } from '../../../test.module';
import { GamePlayUpdateComponent } from 'app/entities/game-play/game-play-update.component';
import { GamePlayService } from 'app/entities/game-play/game-play.service';
import { GamePlay } from 'app/shared/model/game-play.model';

describe('Component Tests', () => {
    describe('GamePlay Management Update Component', () => {
        let comp: GamePlayUpdateComponent;
        let fixture: ComponentFixture<GamePlayUpdateComponent>;
        let service: GamePlayService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CcTestModule],
                declarations: [GamePlayUpdateComponent]
            })
                .overrideTemplate(GamePlayUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GamePlayUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GamePlayService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new GamePlay(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gamePlay = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new GamePlay();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.gamePlay = entity;
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
