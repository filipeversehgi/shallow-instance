export declare const CreateShallowInstance: <T extends new (...args: any) => any>(InjectableClass: T, DependencyTokensEnum: {
    [key: number]: string;
}) => {
    serviceInstance: InstanceType<T>;
    getDependency: <I extends number>(index: I) => ConstructorParameters<T>[I];
    dependencies: ConstructorParameters<T>;
};
export declare type TDefaultExtend = new (...args: any) => any;
export declare type TServiceInstance<T extends TDefaultExtend> = InstanceType<T>;
export declare type TGetDependency<T extends TDefaultExtend> = <I extends number>(index: I) => ConstructorParameters<T>[I];
export declare type TDependencies<T extends TDefaultExtend> = ConstructorParameters<T>;
export declare type TShallowTestClassSut<T extends TDefaultExtend> = {
    serviceInstance: TServiceInstance<T>;
    getDependency: TGetDependency<T>;
    dependencies: TDependencies<T>;
};
