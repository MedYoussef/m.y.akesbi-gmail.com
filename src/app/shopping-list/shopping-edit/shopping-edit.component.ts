import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static:false}) nameIngredient : ElementRef
  @ViewChild('amountInput', {static:false}) amountIngredient : ElementRef
  //@Output() IngredientEmiter = new EventEmitter<Ingredient>();
  constructor(private shoppinglistservice : ShoppingListService) {}
  ngOnInit(): void {
  }
  AddIngredient (){
    this.shoppinglistservice.AddIngredient(new Ingredient(this.nameIngredient.nativeElement.value, this.amountIngredient.nativeElement.value));
    //this.IngredientEmiter.emit(new Ingredient(this.nameIngredient.nativeElement.value, this.amountIngredient.nativeElement.value));
  }
}
