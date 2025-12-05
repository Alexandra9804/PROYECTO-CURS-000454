import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Router } from '@angular/router';
import { BrandModel } from '../../model/brand.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-brand-listado.component',
  imports: [ReactiveFormsModule],
  templateUrl: './brand-listado.component.html',
  styleUrl: './brand-listado.component.scss',
})
export class BrandListadoComponent implements OnInit {
  private readonly brandService = inject(BrandService);

  private readonly router = inject(Router);

  private readonly formBuilder = inject(FormBuilder);

  private readonly cdr = inject(ChangeDetectorRef);

  public brands: BrandModel[] = [];

  public brandListadoForm!: FormGroup;

  ngOnInit(): void {
    this.createListadoForm();
    this.list();
  }

  buscar() {
    const nombre = this.brandListadoForm.controls['nombre'].value;
    this.brandService.buscar(nombre).subscribe({
      next: (res) => {
        this.brands = res;
        if (this.brands) {
          this.brands = this.brands.filter((br) => {
            return br.nombre.includes(nombre);
          });
        }
      },
      error(err) {
        console.error(err);
      },
    });
  }

  list() {
    this.brandService.list().subscribe({
      next: (res) => {
        this.brands = res;
        this.cdr.detectChanges();
      },
      error(err) {
        console.error(err);
      },
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
            next: (res) => {
              swalWithBootstrapButtons.fire({
                title: 'Eliminado!',
                text: 'La marca ' + brand.nombre + ' fue eliminado',
                icon: 'success',
              });
              this.list();
            },
            error(err) {
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
}
