import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
ingredients : Ingredient[] = [];
  private sub : Subscription;
  constructor(private shoppinglistservice : ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistservice.ingredients;
  }

  OnIngredientAdded(ingredient: Ingredient){
    this.shoppinglistservice.AddIngredient(ingredient);
    this.sub = this.shoppinglistservice.ingredientSelected.subscribe(
      (ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }
}
