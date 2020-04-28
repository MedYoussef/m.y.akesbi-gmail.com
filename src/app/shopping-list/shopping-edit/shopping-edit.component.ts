import { Component, OnInit, OnDestroy} from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {


  //@ViewChild('nameInput', {static:false}) nameIngredient : ElementRef
  //@ViewChild('amountInput', {static:false}) amountIngredient : ElementRef
  //@Output() IngredientEmiter = new EventEmitter<Ingredient>();

  form : FormGroup;
  sub : Subscription;
  editMode : boolean = false;
  editedItemIndex;
  constructor(private shoppinglistservice : ShoppingListService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(1, Validators.min(1))
    });
    this. sub = this.shoppinglistservice.SelectedIngredient.subscribe(
      
      (index: number) => {
        this.editedItemIndex = index;
        this.form.setValue({
          name : this.shoppinglistservice.GetIngredientById(index).Name,
          amount: this.shoppinglistservice.GetIngredientById(index).Amount
        });
        this.editMode = true;
      }
    );
  }
  OnSubmit (){
    const newIngredient = new Ingredient (this.form.value.name, this.form.value.amount);
    if(this.editMode){
      this.shoppinglistservice.UpdateIngredient(this.editedItemIndex, newIngredient);
    }
    else {
      this.shoppinglistservice.AddIngredient(newIngredient);
    }
    this.editMode = false;
    //this.IngredientEmiter.emit(new Ingredient(this.nameIngredient.nativeElement.value, this.amountIngredient.nativeElement.value));
  }
  OnDelete(){
    this.shoppinglistservice.DeleteIngredient(this.editedItemIndex);
    this.ClearForm();
  }
  ClearForm(){
    this.form.reset();
    this.editMode = false;
  }
}
