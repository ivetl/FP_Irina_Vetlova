import { Injectable } from '@angular/core';
import { AnimalKind, Animal } from '../models/animals';

@Injectable()
export class AnimalsService {
  private animals: Animal[] = [
    new Animal(AnimalKind.Cat, 'Мурка', 'Белый', 8, 7),
    new Animal(AnimalKind.Cat, 'Муся', 'Голубой', 10, 5),
    new Animal(AnimalKind.Dog, 'Бим', 'Белый', 10, 8),
    new Animal(AnimalKind.Bird, 'Кеша', 'Зеленый', 100, 0.3),
    new Animal(AnimalKind.Fish, 'Клеопатра', 'Золотой', 7, 0.1),
    new Animal(AnimalKind.Cat, 'Рыжик', 'Рыжий', 6, 3),
    new Animal(AnimalKind.Cat, 'Пиксель', 'Рыжий', 11, 8),
    new Animal(AnimalKind.Dog, 'Пиф', 'Серый', 10, 15)
  ];

  public filterAnimals(hideCats: boolean): Animal[] {
    return this.animals.filter(
      (animal) => !hideCats || animal.type !== AnimalKind.Cat
    );
  }
}
