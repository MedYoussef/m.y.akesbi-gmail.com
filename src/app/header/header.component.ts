import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sub : Subscription;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  constructor(private dataStorage : DataStorageService) { }
  //@Output() featureSelected  = new EventEmitter<string>();

  ngOnInit(): void {
  }


  // OnSelect(feature : string){
  //     this.featureSelected.emit(feature);
  // }

  SaveData(){
    this.dataStorage.PostRecipe();
  }
  GetData(){
    this.sub = this.dataStorage.GetRecipe().subscribe();
  }

}
