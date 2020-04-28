import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  constructor(private recipeservice : RecipeService) { }
  sub : Subscription;
  recipes: Recipe[] = [];
  ngOnInit(): void {
    this.recipes = this.recipeservice.recipes;
    //console.log(this.recipes);
    this.sub = this.recipeservice.recipeChanged.subscribe(
      (recipes : Recipe[]) => {
        //console.log(recipes);
        this.recipes = recipes;
      }
    );
  }
}
