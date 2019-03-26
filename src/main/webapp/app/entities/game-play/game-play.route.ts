import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GamePlay } from 'app/shared/model/game-play.model';
import { GamePlayService } from './game-play.service';
import { GamePlayComponent } from './game-play.component';
import { GamePlayDetailComponent } from './game-play-detail.component';
import { GamePlayUpdateComponent } from './game-play-update.component';
import { GamePlayDeletePopupComponent } from './game-play-delete-dialog.component';
import { IGamePlay } from 'app/shared/model/game-play.model';

@Injectable({ providedIn: 'root' })
export class GamePlayResolve implements Resolve<IGamePlay> {
    constructor(private service: GamePlayService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGamePlay> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<GamePlay>) => response.ok),
                map((gamePlay: HttpResponse<GamePlay>) => gamePlay.body)
            );
        }
        return of(new GamePlay());
    }
}

export const gamePlayRoute: Routes = [
    {
        path: '',
        component: GamePlayComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GamePlays'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: GamePlayDetailComponent,
        resolve: {
            gamePlay: GamePlayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GamePlays'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: GamePlayUpdateComponent,
        resolve: {
            gamePlay: GamePlayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GamePlays'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: GamePlayUpdateComponent,
        resolve: {
            gamePlay: GamePlayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GamePlays'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gamePlayPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: GamePlayDeletePopupComponent,
        resolve: {
            gamePlay: GamePlayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GamePlays'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
