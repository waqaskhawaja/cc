import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGamePlay } from 'app/shared/model/game-play.model';

@Component({
    selector: 'jhi-game-play-detail',
    templateUrl: './game-play-detail.component.html'
})
export class GamePlayDetailComponent implements OnInit {
    gamePlay: IGamePlay;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gamePlay }) => {
            this.gamePlay = gamePlay;
        });
    }

    previousState() {
        window.history.back();
    }
}
