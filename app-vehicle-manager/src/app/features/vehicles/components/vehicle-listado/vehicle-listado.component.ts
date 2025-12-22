import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { PageResponse } from '../../../../../shared/models/page-response.model';
import { VehicleModel } from '../../model/vehicle.model';
import { BrandService } from '../../../brands/services/brand.service';
import { BrandModel } from '../../../brands/model/brand.model';
import { ModelComboModel } from '../../../models/model/model.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-listado.component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vehicle-listado.component.html',
  styleUrl: './vehicle-listado.component.scss',
})
export class VehicleListadoComponent implements OnInit {
  private readonly vehicleService = inject(VehicleService);
  private readonly brandService = inject(BrandService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly modalService = inject(BsModalService);

  public vehicleListadoForm!: FormGroup;
  public page = 0;
  public size = 6;
  public totalPages = 0;
  public totalElements = 0;
  public vehicles: VehicleModel[] = [];
  public brands: BrandModel[] = [];
  public models: ModelComboModel[] = [];
  public vehicleSelected!: VehicleModel;
  public modalRef?: BsModalRef;

  ngOnInit(): void {
    this.createListadoForm();
    this.getMarcas();
    this.onMarcaChange();
    this.list();
  }

  list() {
    const vin = this.vehicleListadoForm.controls['vin'].value ?? '';
    const idMarca = this.vehicleListadoForm.controls['marca'].value ?? '';
    const idModelo = this.vehicleListadoForm.controls['modelo'].value ?? '';

    this.vehicleService.list(vin, idMarca, idModelo, this.page, this.size).subscribe({
      next: (res: PageResponse<VehicleModel>) => {
        this.vehicles = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
      },
      error: (err) => console.error(err),
    });
  }

  createListadoForm() {
    this.vehicleListadoForm = this.formBuilder.group({
      vin: '',
      marca: '',
      modelo: '',
    });
  }

  getMarcas() {
    this.brandService.listAll().subscribe((data) => {
      this.brands = data;
    });
  }

  onMarcaChange() {
    this.vehicleListadoForm.get('marca')?.valueChanges.subscribe((idMarca) => {
      this.vehicleListadoForm.get('modelo')?.setValue('');
      this.models = [];

      if (!idMarca) {
        return;
      }

      this.brandService.findModelosByIdMarca(idMarca).subscribe({
        next: (data) => {
          this.models = data;
        },
        error: (err) => console.error(err),
      });
    });
  }

  changePage(page: number) {
    if (page < 0 || page >= this.totalPages) return;

    this.page = page;
    this.list();
  }

  buscar() {
    const vin = this.vehicleListadoForm.controls['vin'].value ?? '';
    const idMarca = this.vehicleListadoForm.controls['marca'].value ?? '';
    const idModelo = this.vehicleListadoForm.controls['modelo'].value ?? '';

    this.page = 0;

    this.vehicleService.list(vin, idMarca, idModelo, this.page, this.size).subscribe({
      next: (res: PageResponse<VehicleModel>) => {
        this.vehicles = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
      },
      error: (err) => console.error(err),
    });
  }

  limpiar() {
    this.vehicleListadoForm.reset({
      vin: '',
      marca: '',
      modelo: '',
    });

    this.list();
  }

  nuevo() {
    this.router.navigate(['home/vehicles/registro']);
  }

  edit(vehicle: VehicleModel) {
    this.router.navigate(['home/vehicles/registro', vehicle.idVehiculo]);
  }

  openModal(template: TemplateRef<void>, vehicle: VehicleModel) {
    this.vehicleSelected = vehicle;
    this.modalRef = this.modalService.show(template);
  }

    delete(vehicle: VehicleModel) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      });
  
      swalWithBootstrapButtons
        .fire({
          title: 'Confirmar eliminación',
          text: 'El vehículo ' + vehicle.vin + ' será eliminado',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.vehicleService.delete(vehicle.idVehiculo).subscribe({
              next: () => {
                const isLastItemOnPage = this.vehicles.length === 1;
  
                if (isLastItemOnPage && this.page > 0) {
                  this.page = this.page - 1;
                }
  
                swalWithBootstrapButtons
                  .fire({
                    title: 'Eliminado!',
                    text: 'El vehículo ' + vehicle.vin + ' fue eliminado',
                    icon: 'success',
                  })
                  .then(() => {
                    this.list();
                  });
              },
              error: (err) => {
                console.error(err);
              },
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: 'Cancelado',
              text: 'El vehículo ' + vehicle.vin + ' no fue eliminado',
              icon: 'error',
            });
          }
        });
    }
}
