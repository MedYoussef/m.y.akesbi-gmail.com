import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

const appRoutes : Routes = [
  {path: 'recipes', loadChildren : ()=>import('./recipes/recipes.module').then(module => module.RecipesModule)},
  {path: 'shoppinglist', loadChildren : ()=> import('./shopping-list/shopping-list.module').then(module=> module.ShoppingListModule), data : {preload : true}},
  {path: '', redirectTo : '/auth', pathMatch : 'full'},
  {path: 'auth', component : AuthComponent}
] 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy : NoPreloading})
  ],
  exports: [RouterModule, RecipesRoutingModule, ShoppingListModule]
})
export class AppRoutingModule { }
