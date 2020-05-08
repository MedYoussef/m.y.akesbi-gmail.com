import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    }
  recipe : Recipe;
  id : number;
  routeSub : Subscription;
  ingredientsAdded : boolean = false;
  error : string = null;
  //recipe : Recipe;
  constructor(private recipeservice : RecipeService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params : Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeservice.FindById(this.id);
    });
  }
  AddToChoppingList(){
    try {
        this.recipeservice.AddIngredientToShoppingList(this.recipe.Ingredients);
        this.ingredientsAdded = true;
        setTimeout(() => this.ingredientsAdded = false, 2000);
    } catch (error) {
      this.error = 'An error occured';
    } 
  }

  DeleteRecipe()
  {
    this.recipeservice.DeleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
