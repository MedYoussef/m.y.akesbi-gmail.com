import { Component, OnInit } from '@angular/core';
import { Ingredient } from './ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients : Ingredient[] = [
  new Ingredient('Semoule', 1),
  new Ingredient('Légumes', 1),
  new Ingredient('Epices', 4)
];
  constructor() { }

  ngOnInit(): void {
  }

}
