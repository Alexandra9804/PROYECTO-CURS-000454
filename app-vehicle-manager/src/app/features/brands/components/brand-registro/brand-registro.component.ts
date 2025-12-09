import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandModel } from '../../model/brand.model';
import { RefreshService } from '../../../../../shared/services/refresh.service';

@Component({
  selector: 'app-brand-registro.component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './brand-registro.component.html',
  styleUrl: './brand-registro.component.scss',
})
export class BrandRegistroComponent implements OnInit {
  private readonly brandService = inject(BrandService);

  private readonly formBuilder = inject(FormBuilder);

  private readonly router = inject(Router);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly toastr = inject(ToastrService);

  private readonly refreshService = inject(RefreshService);

  public brands: BrandModel[] = [];

  public brandForm!: FormGroup;

  public submitted: boolean = false;

  private idMarca?: string;

  ngOnInit(): void {
    this.createForm();
    this.getParameter();
  }

  save() {
    this.submitted = true;
    if (this.brandForm.invalid) {
      return;
    }

    const brand: BrandModel = {
      nombre: this.fc['nombre'].value,
      paisOrigen: this.fc['paisOrigen'].value,
      descripcion: this.fc['descripcion'].value,
      anioFundacion: this.fc['anioFundacion'].value,
    };

    if (this.idMarca) {
      this.brandService.update(this.idMarca, brand).subscribe({
        next: (res) => {
          console.log(brand);
          console.log(res);
          this.toastr.success('Aviso', 'La marca fue actualizada con éxito');
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Error', 'Error al registrar la marca');
        },
      });
    } else {
      this.brandService.save(brand).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Aviso', 'La marca fue registrado con éxito');
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Error', 'Error al registrar la marca');
        },
      });
    }
    this.router.navigate(['home/brands/listado']).then(() => {
      this.refreshService.emitRefresh();
    });
  }

  cancelar() {
    this.router.navigate(['home/brands/listado']);
  }

  getParameter() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.idMarca = params['id'];

          this.brandService.findById(this.idMarca).subscribe({
            next: (res) => {
              console.log(res);
              this.fc['nombre'].setValue(res.nombre);
              this.fc['paisOrigen'].setValue(res.paisOrigen);
              this.fc['descripcion'].setValue(res.descripcion);
              this.fc['anioFundacion'].setValue(res.anioFundacion);
            },
            error(err) {
              console.error(err);
            },
          });
        }
      },
    });
  }

  createForm() {
    this.brandForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      paisOrigen: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      descripcion: ['', [Validators.maxLength(150)]],
      anioFundacion: [
        '',
        [Validators.pattern(/^[0-9]{4}$/), Validators.min(1800), Validators.max(2100)],
      ],
    });
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.brandForm.controls;
  }
}
