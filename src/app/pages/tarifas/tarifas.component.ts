import { Tarifa } from './../../interfaces/Tarifa.interface';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TarifaService } from '@services/tarifa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.scss'
})
export class TarifasComponent {

  public currentTarifa: Tarifa = null;


  public tarifas:Tarifa[] = [];

  modalVisible = false;
  tarifaForm: FormGroup;

  constructor(private fb: FormBuilder, private tarifaService: TarifaService, private router: Router) {
    this.tarifaForm = this.fb.group({
      id_tarifa: [{ value: '', disabled: true }, Validators.required],
      descripcion: [{ value: '', disabled: true }, Validators.required],
      valor_unitario: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {

    this.obtenerTarifas();
  }

  actualizarTarifa() {
    if (!this.currentTarifa) return;

    const tarifaToSave = {
      id: this.currentTarifa.id,
      valor_unitario : this.tarifaForm.get('valor_unitario').value
    };

    this.tarifaService.actualizarTarifa(tarifaToSave).subscribe(
      (response) => {
        if (response.success) {
          Swal.fire("Guardado", "La tarifa se actualizó correctamente", "success");
         this.obtenerTarifas();
         this.closeModal();

        } else {
          Swal.fire("Error", response.message || "Hubo un problema al actualizar la tarifa", "error");
        }
      },
      (error) => {
        console.error('Hubo un problema al actualizar la tarifa:', error);
        Swal.fire("Error", "Hubo un problema al actualizar la tarifa", "error");
      }
    );
  }


  obtenerTarifas(): void {
    this.tarifaService.listarTarifas().subscribe(
      response => {
        if (response.success) {
          this.tarifas = response.tarifas || [];
          console.log('Tarifas obtenidas:', this.tarifas);
        } else {
          console.error(response.message);
          Swal.fire('Error', response.message, 'error');
        }
      },
      error => {
        console.error('Hubo un problema al obtener la lista de tarifas:', error);
        Swal.fire('Error', 'No se pudo obtener la lista de tarifas.', 'error');
      }
    );
  }

  // Método que muestra la confirmación antes de actualizar la tarifa
  showConfirmTarifaEdit() {
    Swal.fire({
      title: '¿Seguro que quieres actualizar la tarifa?',
      text: 'Esto afectará el precio de las próximas facturas emitidas.',
      showCancelButton: true,
      confirmButtonText: 'Actualizar tarifa',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.actualizarTarifa();
      }
    });
  }

  // Método para abrir el modal y establecer la tarifa actual
  openModal(tarifa: Tarifa) {
    console.log(tarifa);
    this.tarifaForm.get('descripcion').setValue(tarifa.descripcion);
    this.tarifaForm.get('valor_unitario').setValue(tarifa.valor_unitario);

    this.currentTarifa = tarifa;
    this.modalVisible = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalVisible = false;
    this.currentTarifa = null;
  }

  // Método que se ejecuta al hacer clic en el botón "Guardar Cambios"
  handleEdit() {
    this.showConfirmTarifaEdit();
  }

}
