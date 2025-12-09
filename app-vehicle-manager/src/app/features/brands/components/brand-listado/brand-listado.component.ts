import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Router } from '@angular/router';
import { BrandModel } from '../../model/brand.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RefreshService } from '../../../../../shared/services/refresh.service';
import { PageResponse } from '../../../../../shared/models/page-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-listado.component',
  imports: [ReactiveFormsModule, CommonModule, ],
  templateUrl: './brand-listado.component.html',
  styleUrl: './brand-listado.component.scss',
})
export class BrandListadoComponent implements OnInit {
  private readonly brandService = inject(BrandService);

  private readonly router = inject(Router);

  private readonly formBuilder = inject(FormBuilder);

  private readonly refreshService = inject(RefreshService);

  public brands: BrandModel[] = [];

  public totalElements = 0;

  public page = 0;

  public size = 6;

  public totalPages = 0;

  public brandListadoForm!: FormGroup;

  public selectedBrand: any = null;

  ngOnInit(): void {
    this.createListadoForm();

    this.refreshService.refresh$.subscribe(() => {
      this.list();
    });

    this.list();
  }

  buscar() {
    const nombre = this.brandListadoForm.controls['nombre'].value ?? '';
    this.page = 0; 

    this.brandService.list(nombre, this.page, this.size).subscribe({
      next: (res: PageResponse<BrandModel>) => {
        this.brands = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
      },
      error: (err) => console.error(err),
    });
  }

  list() {
    const nombre = this.brandListadoForm.controls['nombre'].value ?? '';

    this.brandService.list(nombre, this.page, this.size).subscribe({
      next: (res) => {
        this.brands = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
        this.page = res.number;
      },
      error: (err) => console.error(err),
    });
  }

  edit(brand: BrandModel) {
    this.router.navigate(['home/brands/registro', brand.idMarca]);
  }

  delete(brand: BrandModel) {
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
        text: 'La marca ' + brand.nombre + ' será eliminado',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.brandService.delete(brand.idMarca).subscribe({
            next: () => {
              const isLastItemOnPage = this.brands.length === 1;

              if (isLastItemOnPage && this.page > 0) {
                this.page = this.page - 1;
              }

              this.list();

              swalWithBootstrapButtons.fire({
                title: 'Eliminado!',
                text: 'La marca ' + brand.nombre + ' fue eliminado',
                icon: 'success',
              });
            },
            error: (err) => {
              console.error(err);
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelado',
            text: 'La marca ' + brand.nombre + ' no fue eliminado',
            icon: 'error',
          });
        }
      });
  }

  nuevo() {
    this.router.navigate(['home/brands/registro']);
  }

  createListadoForm() {
    this.brandListadoForm = this.formBuilder.group({
      nombre: [''],
    });
  }

  changePage(page: number) {
    if (page < 0 || page >= this.totalPages) return;

    this.page = page;
    this.list();
  }

  limpiar() {
    this.brandListadoForm.reset({
      nombre: '',
    });

    this.list();
  }

}
