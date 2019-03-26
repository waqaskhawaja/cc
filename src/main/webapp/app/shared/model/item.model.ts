export interface IItem {
    id?: number;
    name?: string;
}

export class Item implements IItem {
    constructor(public id?: number, public name?: string) {}
}
