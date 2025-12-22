import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { VehicleService } from '../../services/vehicle.service';
import { VehicleModel } from '../../model/vehicle.model';
import { BrandService } from '../../../brands/services/brand.service';
import { BrandModel } from '../../../brands/model/brand.model';
import { ModelComboModel } from '../../../models/model/model.model';
import { RefreshService } from '../../../../../shared/services/refresh.service';
import { TipoCombustible } from '../../../../../shared/enums/tipo-combustible.enum';
import { TipoTransmision } from '../../../../../shared/enums/tipo-transmision.enum';
import { EstadoVehiculo } from '../../../../../shared/enums/estado-vehiculo.enum';

@Component({
  selector: 'app-vehicle-registro.component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vehicle-registro.component.html',
  styleUrl: './vehicle-registro.component.scss',
})
export class VehicleRegistroComponent implements OnInit {
  private readonly vehicleService = inject(VehicleService);
  private readonly brandService = inject(BrandService);
  private readonly toastr = inject(ToastrService);
  private readonly refreshService = inject(RefreshService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);

  public tipoCombustibles = Object.values(TipoCombustible);
  public tipoTransmisiones = Object.values(TipoTransmision);
  public estadosVehiculo = Object.values(EstadoVehiculo);

  public vehicleForm!: FormGroup;
  public submitted = false;

  private idVehiculo?: string;

  public brands: BrandModel[] = [];
  public models: ModelComboModel[] = [];

  ngOnInit(): void {
    this.createForm();
    this.getMarcas();
    this.onMarcaChange();
    this.getParameter();
  }


  save(): void {
    this.submitted = true;

    if (this.vehicleForm.invalid) {
      return;
    }

    const vehicle: VehicleModel = {
      vin: this.fc['vin'].value,
      anio: this.fc['anio'].value,
      kilometraje: this.fc['kilometraje'].value,
      color: this.fc['color'].value,
      idMarca: this.fc['marcaId'].value,
      idModelo: this.fc['modeloId'].value,
      tipoCombustible: this.fc['tipoCombustible'].value,
      transmision: this.fc['tipoTransmision'].value,
      estadoVehiculo: this.fc['estadoVehiculo'].value,
      precio: this.fc['precio'].value,
      placa: this.fc['placa'].value,
    };

    if (this.idVehiculo) {
      this.vehicleService.update(this.idVehiculo, vehicle).subscribe({
        next: () => {
          this.toastr.success('Aviso', 'El vehículo fue actualizado con éxito');
        },
        error: () => {
          this.toastr.error('Error', 'Error al actualizar el vehículo');
        },
      });
    } else {
      this.vehicleService.save(vehicle).subscribe({
        next: () => {
          this.toastr.success('Aviso', 'El vehículo fue registrado con éxito');
        },
        error: () => {
          this.toastr.error('Error', 'Error al registrar el vehículo');
        },
      });
    }

    this.router.navigate(['home/vehicles/listado']).then(() => {
      this.refreshService.emitRefresh();
    });
  }

  createForm(): void {
    this.vehicleForm = this.formBuilder.group({
      vin: ['', [Validators.required, Validators.maxLength(17)]],

      anio: [null, [Validators.required, Validators.min(1900), Validators.max(2100)]],

      kilometraje: [0, [Validators.min(0)]],

      color: [''],

      marcaId: [null, [Validators.required]],

      modeloId: [null, [Validators.required]],

      tipoCombustible: [null, [Validators.required]],

      tipoTransmision: [null, [Validators.required]],

      estadoVehiculo: [null, [Validators.required]],

      precio: [null, [Validators.min(0)]],

      placa: ['']
    });
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.vehicleForm.controls;
  }

  cancelar(): void {
    this.router.navigate(['home/vehicles/listado']);
  }

 
  getMarcas(): void {
    this.brandService.listAll().subscribe((data) => {
      this.brands = data;
    });
  }

  onMarcaChange(): void {
    this.vehicleForm.get('marcaId')?.valueChanges.subscribe((idMarca) => {
      this.models = [];
      this.fc['modeloId'].reset();

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


  getParameter(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.idVehiculo = params['id'];

          this.vehicleService.findById(this.idVehiculo).subscribe({
            next: (res) => {
              this.fc['vin'].setValue(res.vin);
              this.fc['anio'].setValue(res.anio);
              this.fc['kilometraje'].setValue(res.kilometraje);
              this.fc['color'].setValue(res.color);
              this.fc['marcaId'].setValue(res.idMarca);

              this.brandService.findModelosByIdMarca(res.idMarca).subscribe((models) => {
                this.models = models;
                this.fc['modeloId'].setValue(res.idModelo);
              });

              this.fc['tipoCombustible'].setValue(res.tipoCombustible);
              this.fc['tipoTransmision'].setValue(res.transmision);
              this.fc['estadoVehiculo'].setValue(res.estadoVehiculo);
              this.fc['precio'].setValue(res.precio);
              this.fc['placa'].setValue(res.placa);
            },
            error: (err) => console.error(err),
          });
        }
      },
    });
  }
}
