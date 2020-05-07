import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';



@NgModule({
  declarations: [ShoppingListComponent,ShoppingEditComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild([{path : 'shoppinglist', component : ShoppingListComponent }] )
  ]
})
export class ShoppingListModule { }
