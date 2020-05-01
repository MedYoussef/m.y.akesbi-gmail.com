import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { componentFactoryName } from '@angular/compiler';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './services/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

const appRoutes : Routes = [
  {path: '', redirectTo : '/recipes', pathMatch : 'full'},
  {path : 'recipes', component : RecipesComponent, children : [
    {path : '', component : RecipeStartComponent, resolve: [RecipesResolverService]},
    {path : 'new', component : RecipeEditComponent},
    {path : ':id/edit', component : RecipeEditComponent, resolve: [RecipesResolverService]},
    {path : ':id', component : RecipeDetailComponent, resolve : [RecipesResolverService]}
  ]},
  {path : 'shoppinglist', component : ShoppingListComponent },
  {path: 'auth', component : AuthComponent}
] 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
