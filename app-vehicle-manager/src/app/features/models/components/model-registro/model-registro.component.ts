import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModelModel } from '../../model/model.model';
import { ModelService } from '../../services/model.service';
import { ToastrService } from 'ngx-toastr';
import { RefreshService } from '../../../../../shared/services/refresh.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../brands/services/brand.service';
import { BrandModel } from '../../../brands/model/brand.model';

@Component({
  selector: 'app-model-registro.component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './model-registro.component.html',
  styleUrl: './model-registro.component.scss',
})
export class ModelRegistroComponent implements OnInit {
  private readonly modelService = inject(ModelService);
  private readonly toastr = inject(ToastrService);
  private readonly refreshService = inject(RefreshService);
  private readonly router = inject(Router);
  private readonly brandService = inject(BrandService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);

  public modelForm!: FormGroup;
  public submitted: boolean = false;
  private idModelo?: string;
  public brands: BrandModel[] = [];

  ngOnInit(): void {
    this.createForm();
    this.getMarcas();
    this.getParameter();
  }

  save() {
    this.submitted = true;
    if (this.modelForm.invalid) {
      return;
    }

    const model: ModelModel = {
      nombre: this.fc['nombre'].value,
      marcaId: this.fc['marcaId'].value,
      descripcion: this.fc['descripcion'].value,
      anioLanzamiento: this.fc['anioLanzamiento'].value,
      version: this.fc['version'].value,
      capacidadPasajeros: this.fc['capacidadPasajeros'].value,
    };

    if (this.idModelo) {
      this.modelService.update(this.idModelo, model).subscribe({
        next: (res) => {
          this.toastr.success('Aviso', 'El modelo fue actualizada con éxito');
        },
        error: (err) => {
          this.toastr.error('Error', 'Error al registrar el modelo');
        },
      });
    } else {
      this.modelService.save(model).subscribe({
        next: (res) => {
          this.toastr.success('Aviso', 'El modelo fue registrado con éxito');
        },
        error: (err) => {
          this.toastr.error('Error', 'Error al registrar el modelo');
        },
      });
    }
    this.router.navigate(['home/models/listado']).then(() => {
      this.refreshService.emitRefresh();
    });
  }

  createForm() {
    this.modelForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

      marcaId: [null, [Validators.required]],

      descripcion: ['', [Validators.maxLength(150)]],

      anioLanzamiento: [
        '',
        [Validators.pattern(/^[0-9]{4}$/), Validators.min(1900), Validators.max(2100)],
      ],

      version: ['', [Validators.maxLength(30)]],

      capacidadPasajeros: [null, [Validators.min(1), Validators.max(50)]],
    });
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.modelForm.controls;
  }

  cancelar() {
    this.router.navigate(['home/models/listado']);
  }

  getMarcas() {
    this.brandService.listAll().subscribe((data) => {
      this.brands = data;
    });
  }

  getParameter() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.idModelo = params['id'];

          this.modelService.findById(this.idModelo).subscribe({
            next: (res) => {
              console.log(res);

              this.fc['nombre'].setValue(res.nombre);
              this.fc['marcaId'].setValue(res.marcaId); 
              this.fc['descripcion'].setValue(res.descripcion);
              this.fc['anioLanzamiento'].setValue(res.anioLanzamiento);
              this.fc['version'].setValue(res.version);
              this.fc['capacidadPasajeros'].setValue(res.capacidadPasajeros);
            },
            error(err) {
              console.error(err);
            },
          });
        }
      },
    });
  }
}
