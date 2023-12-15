var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var instances = new Map();
function Injectable(options) {
    return function (target) {
        instances.set(options.key, new target());
    };
}
function Inject(key) {
    return function (target, propertyKey) {
        target[propertyKey] = instances.get(key);
    };
}
var Alice = /** @class */ (function () {
    function Alice() {
        this.message = "Who's Alice?";
    }
    Alice = __decorate([
        Injectable({ key: "Alice" })
    ], Alice);
    return Alice;
}());
var Bob = /** @class */ (function () {
    function Bob() {
        this.message = "Not me. I'm Bob!";
    }
    Bob = __decorate([
        Injectable({ key: "Bob" })
    ], Bob);
    return Bob;
}());
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.printAliceMessage = function () {
        console.log(this.alice.message);
    };
    Test.prototype.printBobMessage = function () {
        console.log(this.bob.message);
    };
    __decorate([
        Inject("Alice")
    ], Test.prototype, "alice");
    __decorate([
        Inject("Bob")
    ], Test.prototype, "bob");
    return Test;
}());
var test = new Test();
test.printAliceMessage();
test.printBobMessage();
