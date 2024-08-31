import { Client } from '@/interfaces/client';
import { Component } from '@angular/core';
import { ClienteService } from '@services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
   public clients: Client[] = [];
  message: string | null = null;
  error: string | null = null;

  constructor(private clientService: ClienteService) {}

  ngOnInit(): void {
    this.loadClients();
  }


  loadClients(): void {
    this.clientService.listarClientes().subscribe({
      next: (data) => {
        if (data.success) {
          this.clients = data.clients || [];
          this.message = data.message || null;
        } else {
          this.error = data.message || 'Error loading clients';
        }
      },
      error: (err) => {
        this.error = err.message || 'Error loading clients';
      }
    });
  }


}
