import { Component, OnInit } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients : Ingredient[] = [];
  constructor(private shoppinglistservice : ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistservice.ingredients;
  }
  OnIngredientAdded(ingredient: Ingredient){
    this.shoppinglistservice.AddIngredient(ingredient);
  }

}
