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
  recipeChanged = new Subject<Recipe[]>();
  recipes: Recipe[] = [];
  constructor(private shoppinglistservice : ShoppingListService) { }

  AddIngredientToShoppingList(ingredients : Ingredient[]){
    ingredients.forEach(ingredient => {
      this.shoppinglistservice.AddIngredient(ingredient);
    });
  }
  SetRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes);
  }
  DeleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes);
  }
  FindById(id : number) : Recipe{
    return this.recipes[id];
  }

  EditRecipe(id: number, newRecipe : Recipe) {
    this.recipes[id] = newRecipe;
    this.recipeChanged.next(this.recipes);
  }

  AddRecipe(recipe : Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes);
  }

}
