import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from '../services/recipes-resolver.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const RecipesRoute : Routes = [
  {path : 'recipes', component : RecipesComponent, canActivate: [AuthGuard] ,children : [
    {path : '', component : RecipeStartComponent, resolve: [RecipesResolverService]},
    {path : 'new', component : RecipeEditComponent},
    {path : ':id/edit', component : RecipeEditComponent, resolve: [RecipesResolverService]},
    {path : ':id', component : RecipeDetailComponent, resolve : [RecipesResolverService]}
  ]}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(RecipesRoute)
  ],
  exports : [RouterModule]
})
export class RecipesRoutingModule { }
