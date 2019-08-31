import { BindingImpl } from './binding';
export declare class ContainerImpl {
    private bindings;
    isBound(source: Function): boolean;
    bind(source: Function): BindingImpl;
    getInstance<T extends Function>(source: T): T[keyof T];
    getType(source: Function): Function;
}
