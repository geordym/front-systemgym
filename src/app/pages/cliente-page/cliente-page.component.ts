import { Pago } from '@/interfaces/Pago.interface';
import { Suscripcion } from '@/interfaces-client/Suscripcion';
import { Component, OnInit } from '@angular/core';
import { PagosYSuscripcion } from '../../interfaces-client/PagosYSuscripcion';
import { ClientmoduleService } from '@services/clientmodule.service';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrl: './cliente-page.component.scss'
})
export class ClientePageComponent implements OnInit{

  pagosys: PagosYSuscripcion;
  message: string;
  error: string;

  constructor(private clientService: ClientmoduleService){

  }
  ngOnInit(): void {

    this.clientService.listarPagosYSuscripciones().subscribe({
      next: (data) => {
        if (data.success) {
          this.pagosys = data.pagosysuscripcion ;
          console.log(data);
          this.message = data.message || null;
        } else {
          this.error = data.message || 'Error loading data';
        }
      },
      error: (err) => {
        this.error = err.message || 'Error loading data';
      }
    });
  }


  }




