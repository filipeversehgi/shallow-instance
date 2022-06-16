"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
class ServiceToTest {
    constructor(depA, depB) {
        this.depA = depA;
        this.depB = depB;
    }
    methodToTest() {
        const aResult = this.depA.methodA();
        const bResult = this.depB.methodB(aResult);
    }
}
class DependencyA {
    methodA() {
        return Math.floor(Math.random() * 10 + 1);
    }
}
class DependencyB {
    methodB(number) {
        return number * 10;
    }
}
var DEPS;
(function (DEPS) {
    DEPS[DEPS["DEP_A"] = 0] = "DEP_A";
    DEPS[DEPS["DEP_B"] = 1] = "DEP_B";
})(DEPS || (DEPS = {}));
// The first step is to create a Enum with your
// class constructor parameters in order, for
// easy access of those values in your test file
var Deps;
(function (Deps) {
    Deps[Deps["DependencyA"] = 0] = "DependencyA";
    Deps[Deps["DependencyB"] = 1] = "DependencyB";
})(Deps || (Deps = {}));
describe('an easier way to instantiate my class', () => {
    // My service instance
    let service;
    // The dependency getter instance, to create mocks, spy functions and other things
    let dependencies;
    beforeEach(() => {
        // We create a shallow instance and retrieve the instance and the getDependency FUnction
        const { serviceInstance, getDependency } = (0, src_1.CreateShallowInstance)(ServiceToTest, DEPS);
        // We assign them to the upper scope variables, so we can access them in our test blocks
        service = serviceInstance;
        dependencies = getDependency;
        // We can mock default values here on BeforeEach, 
        dependencies(DEPS.DEP_A).methodA = jest.fn().mockReturnValue(5);
    });
    it('should work flawlessly', () => {
        // Or we can mock values here on our test block.
        // All with perfect type infering!
        dependencies(DEPS.DEP_B).methodB = jest.fn();
        service.methodToTest();
        // And we can access those dependencies on assertions as well
        expect(dependencies(DEPS.DEP_B).methodB).toBeCalledWith(5);
    });
});
