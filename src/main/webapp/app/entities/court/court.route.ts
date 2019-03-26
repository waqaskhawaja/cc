import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Court } from 'app/shared/model/court.model';
import { CourtService } from './court.service';
import { CourtComponent } from './court.component';
import { CourtDetailComponent } from './court-detail.component';
import { CourtUpdateComponent } from './court-update.component';
import { CourtDeletePopupComponent } from './court-delete-dialog.component';
import { ICourt } from 'app/shared/model/court.model';

@Injectable({ providedIn: 'root' })
export class CourtResolve implements Resolve<ICourt> {
    constructor(private service: CourtService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICourt> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Court>) => response.ok),
                map((court: HttpResponse<Court>) => court.body)
            );
        }
        return of(new Court());
    }
}

export const courtRoute: Routes = [
    {
        path: '',
        component: CourtComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Courts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CourtDetailComponent,
        resolve: {
            court: CourtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Courts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CourtUpdateComponent,
        resolve: {
            court: CourtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Courts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CourtUpdateComponent,
        resolve: {
            court: CourtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Courts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const courtPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CourtDeletePopupComponent,
        resolve: {
            court: CourtResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Courts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
