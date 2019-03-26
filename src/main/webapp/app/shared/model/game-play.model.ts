import { Moment } from 'moment';
import { ICourt } from 'app/shared/model/court.model';
import { IUser } from 'app/core/user/user.model';

export interface IGamePlay {
    id?: number;
    gamePlaySlot?: Moment;
    court?: ICourt;
    playeds?: IUser[];
    bookeds?: IUser[];
}

export class GamePlay implements IGamePlay {
    constructor(
        public id?: number,
        public gamePlaySlot?: Moment,
        public court?: ICourt,
        public playeds?: IUser[],
        public bookeds?: IUser[]
    ) {}
}
