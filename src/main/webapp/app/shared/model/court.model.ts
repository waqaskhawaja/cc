export interface ICourt {
    id?: number;
    number?: number;
}

export class Court implements ICourt {
    constructor(public id?: number, public number?: number) {}
}
