import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from './data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{



  constructor(private dataStorage : DataStorageService, private recipeService : RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state : RouterStateSnapshot){
    return this.recipeService.recipes.length === 0 ?
     this.dataStorage.GetRecipe() : this.recipeService.recipes;
  }
}
