import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/Models/heroe.model';
import { HeroesService } from 'src/app/serrvices/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  loading = false;

  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.heroesService.getHeroes()
    .subscribe( resp => {
      this.heroes = resp;
      this.loading = false;
    });
}
  eraseHeroe( heroe: any, i: number ){
    Swal.fire({
       title: '¿Está seguro?',
       text: `¿Está seguro que desea borrar a ${heroe.name }?`,
       icon: 'question',
       showConfirmButton: true,
       showCancelButton: true,
    }).then( resp => {
      if( resp.value ){
        this.heroes.splice(i, 1)
        this.heroesService.deleteHeroe( heroe.id ).subscribe();
      }
    });
  }
}
