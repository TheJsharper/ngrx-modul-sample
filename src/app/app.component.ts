import { OnDestroy, OnInit } from '@angular/core';
import { AppMediaQueryService } from './services/app.media-query.service';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subject } from 'rxjs';
import { MediaChange } from '@angular/flex-layout';
import { map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {


  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = true;
  isShowing = false;
  showSubSubMenu: boolean = false;
  mediaQuery:Observable<MediaChange>;
  listenerDestroyer:Subject<void>;


  constructor(private appMediaQueryService:AppMediaQueryService){}
 

  ngOnInit(): void {
    this.listenerDestroyer = new  Subject<void>();
    this.mediaQuery = this.appMediaQueryService.getMediaQuery();
    this.mediaQuery.pipe(
      takeUntil(this.listenerDestroyer),
      tap((mediaChange:MediaChange)=>{
        if(mediaChange.mqAlias == "xs" || 
        mediaChange.mqAlias == "md" ||
         mediaChange.mqAlias == "sm") this.isExpanded = false;
        else this.isExpanded = true;
    })).subscribe();
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  ngOnDestroy(): void {
    if(this.listenerDestroyer){
      if(!this.listenerDestroyer.closed) this.listenerDestroyer.next();
      this.listenerDestroyer.unsubscribe();
    }
  }

}
