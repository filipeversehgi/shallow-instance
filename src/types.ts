
export type TDefaultExtend = new (...args: any) => any;
export type TServiceInstance<T extends TDefaultExtend> = InstanceType<T>
export type TGetDependency<T extends TDefaultExtend> = <I extends number>(index: I) => ConstructorParameters<T>[I]
export type TDependencies<T extends TDefaultExtend> = ConstructorParameters<T>;
export type TShallowTestClassSut<T extends TDefaultExtend> = {
    serviceInstance: TServiceInstance<T>,
    getDependency: TGetDependency<T>,
    dependencies: TDependencies<T>
}

export type TDefaultMocks<
T extends new (...args: any) => any, 
E extends PropertyKey
> = { [key in E]?: ConstructorParameters<T>[key] }