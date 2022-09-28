import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/Models/heroe.model';
import { HeroesService } from 'src/app/serrvices/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(  private heroesService: HeroesService,
                private route: ActivatedRoute ) { }

  ngOnInit( ): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    if ( id !== 'nuevo' ){
      this.heroesService.getHeroe( id )
      .subscribe( (resp: any ) => {
        this.heroe = resp;
        this.heroe.id = id;
      })
    }
  }

  save( form: NgForm ){
    if( form.invalid){
      console.log('Formulario no valido');
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.isLoading();
    let request: Observable<any>;

    if ( this.heroe.id ){
      request = this.heroesService.updateHero( this.heroe );
    } else {
      request = this.heroesService.createHero( this.heroe );
    }
    request.subscribe( resp => {
      Swal.fire({
        title: this.heroe.name,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    });
  }

}
