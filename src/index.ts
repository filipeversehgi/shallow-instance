export const CreateShallowInstance = <T extends new (...args: any) => any>(
  InjectableClass: T,
  DependencyTokensEnum: { [key: number]: string },
): {
  serviceInstance: InstanceType<T>;
  getDependency: <I extends number>(index: I) => ConstructorParameters<T>[I]
  dependencies: ConstructorParameters<T>;
} => {
  const quantityOfDependencies = Object.keys(DependencyTokensEnum).length;
  const dependencies: any = Array(quantityOfDependencies).fill({});
  const serviceInstance = new InjectableClass(...dependencies);
  const getDependency = (dependencyIndex: number) => dependencies[dependencyIndex];
  return { serviceInstance, getDependency, dependencies };
};

export type TDefaultExtend = new (...args: any) => any;

export type TServiceInstance<T extends TDefaultExtend> = InstanceType<T>
export type TGetDependency<T extends TDefaultExtend> = <I extends number>(index: I) => ConstructorParameters<T>[I]
export type TDependencies<T extends TDefaultExtend> = ConstructorParameters<T>;

export type TShallowTestClassSut<T extends TDefaultExtend> = {
  serviceInstance: TServiceInstance<T>,
  getDependency: TGetDependency<T>,
  dependencies: TDependencies<T>
}