import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs';
import { HeroeModel } from '../Models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-heroes-658e1-default-rtdb.firebaseio.com';

  constructor( private thhp: HttpClient ){}

  createHero( heroe : HeroeModel ){
    return this.thhp.post(`${ this.url}/heroes.json`, heroe)
    .pipe(
      map( (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }
  updateHero( heroe: HeroeModel ){
    const heroTemp = {
      ...heroe
    };
    delete heroTemp.id;
    return this.thhp.put(`${ this.url}/heroes/${ heroe.id}.json`, heroTemp);
  }
  deleteHeroe( id: string){
    return this.thhp.delete(`${ this.url }/heroes/${ id }.json`);
  }
  getHeroe( id : string ){
    return this.thhp.get(`${ this.url }/heroes/${ id }.json`);
  }
  getHeroes(){
    return this.thhp.get(`${ this.url }/heroes.json`)
    .pipe(
      map( this.createArray ),
      delay(1500)
      );
    }
  private createArray( heroesObj: any ){
    const heroes: HeroeModel[] = [];
    if (heroesObj === null) { return []; }
    Object.keys (heroesObj).forEach ( key=> {
      const heroe: HeroeModel = heroesObj[key];
        heroe.id = key;
        heroes.push( heroe);
      });
      return heroes;
    }
}
