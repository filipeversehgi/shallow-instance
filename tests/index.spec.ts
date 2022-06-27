import { CreateShallowInstance } from "../src";
import { TDefaultMocks, TGetDependency } from "../src/types";

class ServiceToTest {
    constructor(private depA: DependencyA, private depB: DependencyB) {}

    methodToTest() {
        const aResult = this.depA.methodA();
        const bResult = this.depB.methodB(aResult);
        return { aResult, bResult };
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
enum DEPS {
    DEP_A,
    DEP_B,
}

// The first step is to create a Enum with your
// class constructor parameters in order, for
// easy access of those values in your test file

enum Deps {
    DependencyA,
    DependencyB,
}

describe('when creating a shallow instance of a class', () => {
    // My service instance
    let service: ServiceToTest;

    // The dependency getter instance, to create mocks, spy functions and other things
    let dependencies: TGetDependency<typeof ServiceToTest>

    describe('without passing default mocks', () => {
        beforeEach(() => {
            // We create a shallow instance and retrieve the instance and the getDependency FUnction
            const { serviceInstance, getDependency } = CreateShallowInstance(ServiceToTest, DEPS);
            
            // We assign them to the upper scope variables, so we can access them in our test blocks
            service = serviceInstance;
            dependencies = getDependency; 
    
            // We can mock default values here on BeforeEach, 
            dependencies(DEPS.DEP_A).methodA = jest.fn().mockReturnValue(5);
        });
        
        it('should instantiate',  () => {
            // Or we can mock values here on our test block.
            // All with perfect type infering!
            dependencies(DEPS.DEP_B).methodB = jest.fn();
    
            service.methodToTest();
    
            // And we can access those dependencies on assertions as well
            expect(dependencies(DEPS.DEP_B).methodB).toBeCalledWith(5)
        })
    })

    describe('passing default mocks', () => {
        beforeEach(() => {
            // We can create a premadade mock objects
            const premadeMock: TDefaultMocks<typeof ServiceToTest, DEPS> = {
                [DEPS.DEP_A]: {
                    methodA: () => 999
                }
            }

            // We create a shallow instance and retrieve the instance and the getDependency FUnction
            const { serviceInstance, getDependency } = CreateShallowInstance(ServiceToTest, DEPS, premadeMock);
            
            // We assign them to the upper scope variables, so we can access them in our test blocks
            service = serviceInstance;
            dependencies = getDependency; 
    
        });
        
        it('should instantiate with the premade mock',  () => {
            // Or we can mock values here on our test block.
            // All with perfect type infering!
            dependencies(DEPS.DEP_B).methodB = jest.fn();
            
            const { aResult } = service.methodToTest();
            
            // And we can access those dependencies on assertions as well
            expect(aResult).toBe(999)
            expect(dependencies(DEPS.DEP_B).methodB).toBeCalledWith(999)
        })
    })
    
})