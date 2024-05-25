export interface Client {
    first: number;
    prev:  null;
    next:  number;
    last:  number;
    pages: number;
    items: number;
    data:  Datum[];
}

export enum Gender {
    Female = "female",
    Male = "male",
}
