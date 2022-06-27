import { TDefaultMocks } from "./types";

export const CreateShallowInstance = <T extends new (...args: any) => any, E extends PropertyKey>(
  InjectableClass: T,
  DependencyTokensEnum: { [key: number]: string },
  defaultMocks: TDefaultMocks<T, E> = {},
): {
  serviceInstance: InstanceType<T>;
  getDependency: <I extends number>(index: I) => ConstructorParameters<T>[I]
  dependencies: ConstructorParameters<T>;
} => {
  // Create the Dependencies
  const quantityOfDependencies = Object.keys(DependencyTokensEnum).length;
  const dependencies: any = Array(quantityOfDependencies).fill({});

  if(defaultMocks) {
    for(const key of Object.keys(defaultMocks)) {
      const mock = (defaultMocks as any)[key];
      dependencies[key] = mock;
    }
  }

  // Instantiate
  const serviceInstance = new InjectableClass(...dependencies);

  // Function to retrieve dependencies
  const getDependency = (dependencyIndex: number) => dependencies[dependencyIndex];


  return { serviceInstance, getDependency, dependencies };
};