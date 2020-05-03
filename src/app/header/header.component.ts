import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  sub : Subscription;
  userSub : Subscription;
  isAuthenticated : boolean = false;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.userSub.unsubscribe();
  }

  constructor(private dataStorage : DataStorageService, private authService : AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; // !user ? false : true;
      console.log(user);
    });
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
  LogOut(){
    this.authService.LogOut();
  }

}
