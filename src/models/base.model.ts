import { DBQueryResult, ObjectType } from '@app-types/index';
import { BaseModelType, StaticThis } from "@modules/core/types";


export default abstract class BaseModel<T extends ObjectType> implements BaseModelType<T> {

    public ID: number;

    protected _props: T;

    constructor(data: T) {
        this.setProps(data);
    }

    public setProps(data: T) {
        this._props = data;
        for (const prop in data) {
            Object.assign(this, {[prop]: data[prop]});
        }
    }

    public getProps(): T {
        return this._props;
    }

    static create<T, Model extends BaseModel<T>>(this: StaticThis<Model>, data: T) {
        const that = new this(data);
        return that;
    }
}