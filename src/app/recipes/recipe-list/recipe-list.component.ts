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
    new Recipe('Couscous','Cuisine Marocaine', 'https://upload.wikimedia.org/wikipedia/commons/5/56/Couscous_Moroc.JPG'),
    new Recipe('Paella','Cuisine Espagnole', 'https://storage.needpix.com/rsynced_images/cuisine-1740965_1280.jpg')

  ]; 
  ngOnInit(): void {
  }

}
