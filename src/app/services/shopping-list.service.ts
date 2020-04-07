import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shopping-list/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientSelected = new EventEmitter<Ingredient>();
  ingredients : Ingredient[] = [
    new Ingredient('Semoule', 1),
    new Ingredient('Légumes', 1),
    new Ingredient('Epices', 4)
  ];
  constructor() { }
  AddIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }
}
