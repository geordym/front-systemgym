import { Suscripcion } from '@/interfaces/Suscripcion';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuscripcionService } from '@services/suscripcion.service';

@Component({
  selector: 'app-suscripcion-listar',
  templateUrl: './suscripcion-listar.component.html',
  styleUrl: './suscripcion-listar.component.scss'
})
export class SuscripcionListarComponent {

  public error:any;
  public message:any;
  public suscripciones:Suscripcion[] = [];

  constructor(private suscripcionService: SuscripcionService, private router: Router){}


  ngOnInit(): void {
    this.getSuscripciones();
  }

  getSuscripciones(): void {
    this.suscripcionService.listarSuscripciones().subscribe({
      next: (response) => {
        if (response.success) {
          this.suscripciones = response.suscripciones || [];
          this.message = response.message || '';
        } else {
          this.error = response.message || 'Error desconocido';
        }
      },
      error: (err) => {
        this.error = 'Error al cargar las suscripciones';
        console.error(err);
      }
    });
  }

  handleClick(): void {
    this.router.navigate(['/membresias/crear']); // Navega al formulario de creación de membresías
  }

}
