import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shopping-list/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientSelected = new EventEmitter<Ingredient>();
  SelectedIngredient = new Subject<number>();
  
  ingredients : Ingredient[] = [
    new Ingredient('Semoule', 1),
    new Ingredient('Légumes', 1),
    new Ingredient('Epices', 4)
  ];
  constructor() { }
  AddIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }

  UpdateIngredient(index : number, ingredient : Ingredient){
    this.ingredients[index].Name = ingredient.Name;
    this.ingredients[index].Amount = ingredient.Amount;
  }

  DeleteIngredient(index : number){
    this.ingredients.splice(index, 1);
  }
  GetIngredientById(index: number){
    return this.ingredients[index];
  }
}
