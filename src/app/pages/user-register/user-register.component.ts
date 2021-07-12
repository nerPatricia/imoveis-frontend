import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.less'],
})
export class UserRegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    });
  }

	getErrorMessage(field) {
		return this.form.get(field).hasError('required')
			? 'Campo requerido'
			: this.form.get(field).hasError('email')
			? 'Email inválido'
			: this.form.get(field).hasError('minlength')
			? 'Campo inválido'
			: '';
	}

	isValid(field) {
		if (
			this.form.get(field).value === '' ||
			this.form.get(field).value === null
		) {
			return false;
		}
		return this.form.get(field).valid;
  }

  login() {
    
  }

  register() {
    if (this.form.invalid) {
      swal.fire('Atenção!', 'Preencha todos os campos antes de continuar', 'warning');
      return;
    }
  }
}
