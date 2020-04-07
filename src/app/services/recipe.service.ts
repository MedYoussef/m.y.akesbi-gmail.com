import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shopping-list/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Couscous',
    'Cuisine Marocaine', 
    'https://upload.wikimedia.org/wikipedia/commons/5/56/Couscous_Moroc.JPG',
    [new Ingredient('Semoule', 1), new Ingredient('légumes', 7), new Ingredient('épices', 3)]),
    new Recipe('Paella',
    'Cuisine Espagnole',
     'https://storage.needpix.com/rsynced_images/cuisine-1740965_1280.jpg',
     [new Ingredient ('riz', 1), new Ingredient('Poisson', 3), new Ingredient('épices', 3), new Ingredient('Légumes', 2)])
  ];
  constructor(private shoppinglistservice : ShoppingListService) { }

  AddIngredientToShoppingList(ingredients : Ingredient[]){
    ingredients.forEach(ingredient => {
      this.shoppinglistservice.AddIngredient(ingredient);
    });
  }
}