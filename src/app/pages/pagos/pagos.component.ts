import { Pago } from '@/interfaces/Pago.interface';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PagosService } from '@services/pagos.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss'
})
export class PagosComponent {


  public pagos: Pago[] = [];
  public message: string | null = null;
  public error: string | null = null;


  constructor(
    private router: Router,
    private pagosService: PagosService
  ) {}


  ngOnInit(): void {
    this.loadPagos();
  }

  loadPagos(): void {
    this.pagosService.listarPagos().subscribe(
      (response) => {
        if (response.success) {
          this.pagos = response.pagos;
        } else {
          this.error = response.message;
        }
      },
      (error) => {
        console.error('Hubo un problema al obtener la lista de pagos:', error);
        this.error = 'Hubo un problema al cargar los pagos.';
      }
    );
  }

  handleClick(): void {
    this.router.navigate(['/pagos-pagar']);
  }

  collapse(): void {
    // Implementación para colapsar el card
  }

  remove(): void {
    // Implementación para remover el card
  }


}
