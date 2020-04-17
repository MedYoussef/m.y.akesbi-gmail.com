import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shopping-list/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();
  recipes: Recipe[] = [
    new Recipe(0,'Couscous',
    'Cuisine Marocaine', 
    'https://upload.wikimedia.org/wikipedia/commons/5/56/Couscous_Moroc.JPG',
    [new Ingredient('Semoule', 1), new Ingredient('légumes', 7), new Ingredient('épices', 3)]),
    new Recipe(1, 'Paella',
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

  FindById(id : number) : Recipe{
    return this.recipes.find(s=>s.Id === id);
  }

}
