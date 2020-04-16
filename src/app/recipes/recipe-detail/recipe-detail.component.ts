import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe : Recipe;
  id : number;
  //recipe : Recipe;
  constructor(private recipeservice : RecipeService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeservice.FindById(this.id);
    });
  }
  AddToChoppingList(){
    this.recipeservice.AddIngredientToShoppingList(this.recipe.Ingredients);
  }

}
