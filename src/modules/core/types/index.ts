//import { NodeCallback, DBQueryResult } from "@root/types";


export interface BaseModelType<T> {
    ID: number;
    getProps: () => T;
    setProps: (data: T) => void;
}

export type StaticThis<T> = { new (data): T };


