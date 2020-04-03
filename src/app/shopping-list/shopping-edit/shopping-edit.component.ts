import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static:false}) nameIngredient : ElementRef
  @ViewChild('amountInput', {static:false}) amountIngredient : ElementRef
  @Output() IngredientEmiter = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }
  AddIngredient (){
    this.IngredientEmiter.emit(new Ingredient(this.nameIngredient.nativeElement.value, this.amountIngredient.nativeElement.value));
  }
}
