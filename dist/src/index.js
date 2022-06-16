"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateShallowInstance = void 0;
const CreateShallowInstance = (InjectableClass, DependencyTokensEnum) => {
    const quantityOfDependencies = Object.keys(DependencyTokensEnum).length;
    const dependencies = Array(quantityOfDependencies).fill({});
    const serviceInstance = new InjectableClass(...dependencies);
    const getDependency = (dependencyIndex) => dependencies[dependencyIndex];
    return { serviceInstance, getDependency, dependencies };
};
exports.CreateShallowInstance = CreateShallowInstance;
