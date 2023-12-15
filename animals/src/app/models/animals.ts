export enum AnimalKind {
  Cat = 'Кошка',
  Dog = 'Собака',
  Bird = 'Птичка',
  Fish = 'Рыбка', 
}

export class Animal {
  constructor(
    public type: AnimalKind,
    public name: string,
    public color: string,
    public age: number,
    public weight: number,
  ) {}
}
