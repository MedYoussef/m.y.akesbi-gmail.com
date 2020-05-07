import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';

const appRoutes : Routes = [
  {path: 'recipes', loadChildren : ()=>import('./recipes/recipes.module').then(module => module.RecipesModule)},
  {path: 'shoppinglist', loadChildren : ()=> import('./shopping-list/shopping-list.module').then(module=> module.ShoppingListModule)},
  {path: '', redirectTo : '/auth', pathMatch : 'full'},
  {path: 'auth', component : AuthComponent}
] 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy : PreloadAllModules})
  ],
  exports: [RouterModule, RecipesRoutingModule]
})
export class AppRoutingModule { }
