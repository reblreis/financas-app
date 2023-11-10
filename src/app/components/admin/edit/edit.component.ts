import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriasResponse } from 'src/app/models/contas/categorias-response.model';
import { getCategorias, getContaById, putContas } from 'src/app/services/contas-service';
import { DatePipe } from '@angular/common';
import { ContasRequest } from 'src/app/models/contas/contas-request.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {

  editForm: FormGroup;
  categorias: CategoriasResponse[] = [];
  mensagem: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private datePipe: DatePipe
  ) {
    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      data: ['', Validators.required],
      valor: ['', Validators.required],
      tipo: ['', Validators.required],
      categoria: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  get form(): any {
    return this.editForm.controls;
  }

  ngOnInit(): void {
    this.spinnerService.show();
    getCategorias()
      .subscribe({
        next: (data) => {
          this.categorias = data;
        },
        error: (e) => {
          console.log(e.response);
        },
      })
      .add(() => {
        this.spinnerService.hide();
      });

    this.spinnerService.show();
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    getContaById(id)
      .subscribe({
        next: (conta) => {
          //preenchendo o formulário
          this.editForm.patchValue({
            id: conta.id,
            nome: conta.nome,
            data: this.datePipe.transform(conta.data, 'yyyy-MM-dd'),
            valor: conta.valor,
            descricao: conta.descricao,
            tipo: conta.tipo,
            categoria: conta.categoria?.id
          });
        },
        error: (e) => {
          console.log(e.error);
        },
      })
      .add(() => {
        this.spinnerService.hide();
      });
  }

  onSubmit(): void {
    this.spinnerService.show();

    const request = new ContasRequest(
      this.editForm.value.id as string,
      this.editForm.value.nome as string,
      this.editForm.value.data as Date,
      this.editForm.value.valor as number,
      this.editForm.value.descricao as string,
      this.editForm.value.tipo as number,
      this.editForm.value.categoria as string,
    );

    putContas(request)
      .subscribe({
        next: (data) => {
          this.mensagem = `Conta '${data.nome}' atualizada com sucesso.`;
        },
        error: (e) => {
          console.log(e.response);
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
  }
}