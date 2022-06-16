# Shallow Test Utility

On systems that rely on dependency injection, test can sometimes be hard to setup, and if you forget to mock a dependency of your class, you may end up instantiating it and making your test not be "Unitary" anymore.

Tht's what this package aims to solde, inspired on angular Shallow Renderer. You can easly, just with a ENUM that represents your class constructor parameters order, instantiate it with the certainty that all of your constructor dependencies will be empty, ready to mock.

## How to Use

Supose you'll be testing this scenario:

```ts
// index.ts

class ServiceToTest {
    constructor(private depA: DependencyA, private depB: DependencyB) {}

    methodToTest() {
        const aResult = this.depA.methodA();
        const bResult = this.depB.methodB(aResult);
    }
}

class DependencyA {
    methodA() {
        return Math.floor(Math.random() * 10 + 1)
    }

}

class DependencyB {
    methodB(number: number) {
        return number * 10
    }
}
```

Your test file need to Shallow instantiate your `ServiceToTest`, and you can do it this way:

```ts
// index.spec.ts

import { ServiceToTest } from '.'
import { CreateShallowInstance, TGetDependency } from 'shallow-instance';

// The first step is to create a Enum with your
// class constructor parameters in order, for
// easy access of those values in your test file

enum Deps {
    DependencyA,
    DependencyB,
}

describe('an easier way to instantiate my class', () => {
    // My service instance
    let service: ServiceToTest;

    // The dependency getter instance, to create mocks, spy functions and other things
    let dependencies: TGetDependency<typeof ServiceToTest>
    
    beforeEach(() => {
        // We create a shallow instance and retrieve the instance and the getDependency FUnction
        const { serviceInstance, getDependency } = CreateShallowInstance(ServiceToTest, DEPS);
        
        // We assign them to the upper scope variables, so we can access them in our test blocks
        service = serviceInstance;
        dependencies = getDependency; 

        // We can mock default values here on BeforeEach, 
        dependencies(DEPS.DEP_A).methodA = jest.fn().mockReturnValue(5);
    });
    
    it('should work flawlessly',  () => {
        // Or we can mock values here on our test block.
        // All with perfect type infering!
        dependencies(DEPS.DEP_B).methodB = jest.fn();

        service.methodToTest();

        // And we can access those dependencies on assertions as well
        expect(dependecies(DEPS.DEP_B).methodB).toBeCalledWith(5)
    })
})
```