import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http : HttpClient, private recipeService : RecipeService) { }

  PostRecipe(){
    const recipes = this.recipeService.recipes;
    this.http.put('https://recipebook-ada03.firebaseio.com/recipes.json', recipes).subscribe(res => {
      console.log(res);
    });
  }

  GetRecipe(){
    return this.http.get<Recipe[]>('https://recipebook-ada03.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients : recipe.Ingredients ? recipe.Ingredients : []}
      })
    }), tap(recipes => {
      this.recipeService.SetRecipes(recipes);
    }))
  }
}
