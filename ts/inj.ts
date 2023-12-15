const instances = new Map<string, any>();

function Injectable(options: { key: string }): ClassDecorator {
  return function (target: any) {
    instances.set(options.key, new target())
  }
}

function Inject(key: string): PropertyDecorator {
  return function (target: any, propertyKey: string) {
    target[propertyKey] = instances.get(key)
  }
}

@Injectable({ key: "Alice" })
class Alice {
  public message = "Who's Alice?";
}

@Injectable({ key: "Bob" })
class Bob {
  public message = "Not me. I'm Bob!";
}

class Test {
  @Inject("Alice")
  public alice: Alice;

  @Inject("Bob")
  public bob: Bob;

  public printAliceMessage(): void {
    console.log(this.alice.message);
  }

  public printBobMessage(): void {
    console.log(this.bob.message);
  }
}

const test = new Test();
test.printAliceMessage();
test.printBobMessage();