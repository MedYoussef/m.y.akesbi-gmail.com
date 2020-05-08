import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shopping-list/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  constructor(private router : Router, private route : ActivatedRoute, private recipeService : RecipeService) { }
  id : number;
  editMode = false;
  recipeForm : FormGroup;
  recipeEdit : Recipe;
  routeSub : Subscription;
  message : string = null;
  error : string = null;
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null ? true : false;
        this.InitForm();
      }
    );
  }
  OnSubmit(){
    console.log(this.recipeForm.value);
    const ingredients = this.recipeForm.value['ingredients'];
    let ingredientsToAdd = [];
    for(let ingredient of ingredients){
      ingredientsToAdd.push(new Ingredient(ingredient.name, ingredient.amount));
    }

    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      ingredientsToAdd)

    if(this.editMode){
      try {
        this.recipeService.EditRecipe(this.id, newRecipe);
        this.message = 'Recipe updated';
      } catch (error) {
        this.error = 'An error occured';
      }
    }
    else{
      try {
      this.recipeService.AddRecipe(newRecipe);
      this.message = 'Recipe added';
      } catch (error) {
        this.error = 'An error occured';
      }
    }
    setTimeout(()=>{
      this.router.navigate(['recipes']);
    }, 2000)

  }
  DeleteIngredient(index : number){
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
  OnAddIngredient(){
    (<FormArray>(this.recipeForm.get('ingredients'))).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.min(1)])
      })
    );
  }
  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  ClearIngredients(){
    (this.recipeForm.get('ingredients') as FormArray).clear();
  }
  InitForm(){
    let recipeName = '';
    let recipeImg = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode){
      this.recipeEdit = this.recipeService.FindById(this.id);
      recipeName = this.recipeEdit.Name;
      recipeImg = this.recipeEdit.ImagePath;
      recipeDescription = this.recipeEdit.Description;
      if(this.recipeEdit['Ingredients']){
        for (let ingredient of this.recipeEdit.Ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.Name, Validators.required),
              'amount' : new FormControl(ingredient.Amount, [Validators.required, Validators.min(1)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup(
      {
        'name' : new FormControl(recipeName, Validators.required),
        'imagePath' : new FormControl(recipeImg, Validators.required),
        'description' : new FormControl(recipeDescription, Validators.required),
        'ingredients' : recipeIngredients
      }
    );
  }

}
