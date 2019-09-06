import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel [] = [];
  cargando = false;

  constructor( private heroesService: HeroesService) { }

  ngOnInit() {

    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe( respuesta => {
        // console.log(respuesta);
        this.heroes = respuesta;
        this.cargando = false;
      });
  }

  borrarHeroe(heroe: HeroeModel, indice: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `De borrar a ${ heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then ( respuesta => {
      if ( respuesta.value) {
        this.heroes.splice(indice, 1);

        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });
  }
}
