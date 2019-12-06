import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel ();

  constructor(private heroeService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo') {
      this.heroeService.getHeroe( id )
        .subscribe( (respuesta: HeroeModel ) => {
          this.heroe = respuesta;
          this.heroe.id = id;
          // console.log(this.heroe);
        });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('formulario invalido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type : 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id ) {
      peticion = this.heroeService.actualizarHeroe(this.heroe);
        // .subscribe(respuesta => {
        //   console.log(respuesta);
        // });
    } else {
      peticion = this.heroeService.crearHeroe(this.heroe);
        // .subscribe(respuesta => {
        //   this.heroe = respuesta;
        //   console.log(respuesta);
        // });
    }

    peticion.subscribe( respuesta => {

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });
  }

}
