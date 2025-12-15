import { Component, inject, OnInit } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageResponse } from '../../../../../shared/models/page-response.model';
import { ModelModel } from '../../model/model.model';
import { BrandService } from '../../../brands/services/brand.service';
import { BrandModel } from '../../../brands/model/brand.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-listado.component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './model-listado.component.html',
  styleUrl: './model-listado.component.scss',
})
export class ModelListadoComponent implements OnInit {
  private readonly modelService = inject(ModelService);

  private readonly brandService = inject(BrandService);

  private readonly formBuilder = inject(FormBuilder);

  private readonly router = inject(Router);

  public modelListadoForm!: FormGroup;

  public page = 0;

  public size = 6;

  public totalPages = 0;

  public totalElements = 0;

  public models: ModelModel[] = [];

  public brands: BrandModel[] = [];

  ngOnInit(): void {
    this.createListadoForm();
    this.getMarcas();
    this.list();
  }

  list() {
    const nombre = this.modelListadoForm.controls['nombre'].value ?? '';
    const idMarca = this.modelListadoForm.controls['marca'].value ?? '';

    this.modelService.list(nombre, idMarca, this.page, this.size).subscribe({
      next: (res: PageResponse<ModelModel>) => {
        this.models = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
      },
      error: (err) => console.error(err),
    });
  }

  createListadoForm() {
    this.modelListadoForm = this.formBuilder.group({
      nombre: '',
      marca: '',
    });
  }

  changePage(page: number) {
    if (page < 0 || page >= this.totalPages) return;

    this.page = page;
    this.list();
  }

  getMarcas() {
    this.brandService.listAll().subscribe((data) => {
      this.brands = data;
    });
  }

  buscar() {
    const nombre = this.modelListadoForm.controls['nombre'].value ?? '';
    const idMarca = this.modelListadoForm.controls['marca'].value ?? '';

    this.page = 0;

    this.modelService.list(nombre, idMarca, this.page, this.size).subscribe({
      next: (res: PageResponse<ModelModel>) => {
        this.models = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
      },
      error: (err) => console.error(err),
    });
  }

  limpiar() {
    this.modelListadoForm.reset({
      nombre: '',
      marca: '',
    });

    this.list();
  }

  nuevo() {
    this.router.navigate(['home/models/registro']);
  }
}
