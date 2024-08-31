import { Client } from '@/interfaces/client';
import { Factura } from '@/interfaces/Factura.interface';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '@services/cliente.service';
import { FacturaService } from '@services/factura.service';
import { PagosService } from '@services/pagos.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-pagos-pagar',
  templateUrl: './pagos-pagar.component.html',
  styleUrl: './pagos-pagar.component.scss'
})
export class PagosPagarComponent {

  pagoForm: FormGroup;
  clients: Client[] = [];
  public facturas: Factura[] = [];
  message: string | null = null;
  error: string | null = null;

  public monto_pendiente: number = 0;

  constructor(
    private fb: FormBuilder,
    private pagosService: PagosService,
    private clienteService: ClienteService,
    private facturaService: FacturaService,
    private router: Router
  ) {
    this.pagoForm = this.fb.group({
      id_cliente: ['', Validators.required],
      id_factura: ['', Validators.required],
      descripcion: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(1), Validators.max(0)]],
      metodo_pago: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clienteService.listarClientes().subscribe(
      (response) => {
        if (response.success) {
          this.clients = response.clients;
        } else {
          this.error = response.message;
        }
      },
      (error) => {
        console.error('Hubo un problema al obtener la lista de clientes:', error);
        this.error = 'Hubo un problema al cargar los clientes.';
      }
    );
  }

  loadFacturas(cliente_id: string): void {
    this.facturaService.listarFacturasPorClienteId(parseInt(cliente_id)).subscribe(
      (response) => {
        if (response.success) {
          this.facturas = response.facturas;
        } else {
          this.error = response.message;
        }
      },
      (error) => {
        console.error('Hubo un problema al obtener la lista de facturas:', error);
        this.error = 'Hubo un problema al cargar las facturas.';
      }
    );
  }

  handleSelectChangeCliente(): void {
    const clienteId = this.pagoForm.get('id_cliente')?.value;
    if (clienteId) {
      this.loadFacturas(clienteId);
    }
  }

  handleSelectChangeFactura(): void {
    const facturaId = this.pagoForm.get('id_factura')?.value;
    if (facturaId) {
      const factura: Factura | undefined = this.facturas.find(f => f.id === parseInt(facturaId));

      if (factura) {
        // Asegúrate de que la propiedad 'monto_pendiente' existe en tu interfaz Factura
        console.log(factura);
        this.pagoForm.get('monto')?.setValue(factura.monto_pendiente || 0);

        // Establecer valores mínimo y máximo
        this.pagoForm.get('monto')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(factura.monto_pendiente)
        ]);
        this.pagoForm.get('monto')?.updateValueAndValidity(); // Actualiza las validaciones
        this.monto_pendiente = factura.monto_pendiente;
      } else {
        // Manejar el caso en el que no se encuentra la factura
        console.error('Factura no encontrada');
        this.pagoForm.get('monto')?.setValue(0);
        this.monto_pendiente = 0;

      }
    }
  }

  handleClick() {
    this.router.navigate(['/pagos']);
    }

    enviarFormularioPagarFactura(): void {
      // Verificamos si el formulario es válido
      if (this.pagoForm.valid) {
        this.pagosService.pagarFactura(this.pagoForm.value).subscribe(
          (response) => {
            if (response.success) {
              Swal.fire({
                icon: 'success',
                title: 'Pago realizado',
                text: response.message,
                confirmButtonText: 'OK'
              });
              this.router.navigate(['/pagos']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.message,
                confirmButtonText: 'OK'
              });
            }
          },
          (error) => {
            console.error('Error:', error.error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.message || 'Hubo un problema al realizar el pago.',
              confirmButtonText: 'OK'
            });
          }
        );
      } else {
        // Si el formulario no es válido, revisamos cuál campo no se ha llenado y mostramos un mensaje de error específico
        if (this.pagoForm.get('id_cliente').invalid) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe seleccionar un cliente.',
            confirmButtonText: 'OK'
          });
        } else if (this.pagoForm.get('id_factura').invalid) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe seleccionar una factura.',
            confirmButtonText: 'OK'
          });
        } else if (this.pagoForm.get('descripcion').invalid) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe ingresar una descripción.',
            confirmButtonText: 'OK'
          });
        } else if (this.pagoForm.get('metodo_pago').invalid) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe seleccionar un método de pago.',
            confirmButtonText: 'OK'
          });
        } else if (this.pagoForm.get('monto').invalid) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe ingresar un monto válido.',
            confirmButtonText: 'OK'
          });
        }
      }
    }


}
