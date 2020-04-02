import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  constructor() { }
  recipes: Recipe[] = [
    new Recipe('Couscous','Plat Marocain', 'https://images.app.goo.gl/CDThv8tuZU43vMCL9')
  ]; 
  ngOnInit(): void {
  }

}
