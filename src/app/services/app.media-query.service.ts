import { Injectable } from "@angular/core";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AppMediaQueryService{


    constructor(private mediaObserver: MediaObserver ){}

   public getMediaQuery():Observable<MediaChange>{
        return this.mediaObserver
        .asObservable()
        .pipe(
          map((media: MediaChange[]) =>
            media.find(
              (x) => x.mqAlias == 'xs' || x.mqAlias == 'md'  || x.mqAlias == 'lg' || x.mqAlias == 'xl' || x.mqAlias =="sm"
            )
          )
        );
    }

}