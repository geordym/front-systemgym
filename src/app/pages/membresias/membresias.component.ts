import { Membresia } from '@/interfaces/Membresia.interface';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MembresiasService } from '@services/membresias.service';

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrl: './membresias.component.scss'
})
export class MembresiasComponent {



  constructor(private membresiasService: MembresiasService,
    private modalService: NgbModal,
    private router: Router
  ) { }





remove() {
throw new Error('Method not implemented.');
}
collapse() {
throw new Error('Method not implemented.');
}

handleClick() {
  this.router.navigate(['/membresias-crear']);
}

  membresias: any[] = []; // Define correctamente el tipo según tu modelo
  message: string | null = null;
  error: string | null = null;


  formData: Membresia = {
    nombre: '',
    precio: 0,
    periodicidad: 'mensual',
    accesos: ''
  };

  handleChange(event: any) {
    const { name, value } = event.target;
    this.formData = { ...this.formData, [name]: value };
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.membresiasService.crearMembresia(this.formData).subscribe(
      response => {
        if (response.success) {
          this.message = 'Membresía creada correctamente';
          this.formData = { nombre: '', precio: 0, periodicidad: 'mensual', accesos: '' };
        } else {
          this.error = response.message || 'Error al crear la membresía';
        }
      },
      error => {
        this.error = 'Error al crear la membresía';
      }
    );
  }


  editar(id: any) {
    this.router.navigate(["/membresias/editar/", id])
    }



  ngOnInit(): void {
    this.loadMembresias();
  }

  loadMembresias(): void {
    this.membresiasService.listarMembresias().subscribe(response => {
      console.log(response);
      if (response.success) {
        this.membresias = response.membresias || [];
        this.message = response.message || null;
      } else {
        this.error = response.message || 'No se pudo obtener la lista de membresías.';
      }
    });
  }

}
