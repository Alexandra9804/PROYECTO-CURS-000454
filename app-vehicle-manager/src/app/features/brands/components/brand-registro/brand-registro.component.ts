import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandModel } from '../../model/brand.model';

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

  public brands: BrandModel[] = [];

  public brandForm!: FormGroup;

  public submitted: boolean = false;

  private idMarca?: string;

  ngOnInit(): void {
    this.createForm();
    this.getParameter(this.activatedRoute);
  }

  save() {
    this.submitted = true;
    if (this.brandForm.invalid) {
      return;
    }

    const brand: BrandModel = {
      nombre: this.fc['nombre'].value,
      paisOrigen: this.fc['paisOrigen'].value,
    };

    if (this.idMarca) {
      this.brandService.update(this.idMarca, brand).subscribe({
        next: (res) => {
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
    this.router.navigate(['home/brands/listado']);
  
  }

  cancelar() {
    this.router.navigate(['home/brands/listado']);
  }

  getParameter(activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.idMarca = params['id'];

          this.brandService.findById(this.idMarca).subscribe({
            next: (res) => {
              console.log(res);
              this.fc['nombre'].setValue(res.nombre);
              this.fc['paisOrigen'].setValue(res.paisOrigen);
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
    });
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.brandForm.controls;
  }
}
