import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Animal } from './models/animals';
import { AnimalsService } from './services/animals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AnimalsService],
})
export class AppComponent implements OnInit {
  public animals: Animal[] = [];
  public selectedAnimal: Animal | null = null;

  public hideCats = false;

  constructor(
    private readonly animalsService: AnimalsService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.animals = this.animalsService.filterAnimals(this.hideCats);
  }

  public showAnimalDetails(animal: Animal): void {
    this.selectedAnimal = animal;

    this.cdr.detectChanges();
  }

  public closeDetails(): void {
    this.selectedAnimal = null;

    this.cdr.detectChanges();
  }

  public toggleCatsVisibility(): void {
    this.toggleHideCats();

    this.animals = this.animalsService.filterAnimals(this.hideCats);
  }

  private toggleHideCats(): void {
    this.hideCats = !this.hideCats;
  }
}
