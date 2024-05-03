import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponseI } from 'src/app/services/interfaces/shared.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private _userService: UserService,) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      personFirstName: ['', [Validators.required, Validators.maxLength(60)]],
      personLastName: ['', [Validators.required, Validators.maxLength(60)]],
      personIdentification: ['', [Validators.required, Validators.minLength(10), Validators.pattern('\\d{10}')]],
      personBirthDate: ['', Validators.required],
      userName: ['', [
        Validators.required,
        Validators.pattern(/^[^\W_]*$/), // No debe contener signos
        Validators.pattern(/.*\d.*/), // Debe contener al menos un número
        Validators.pattern(/.*[A-Z].*/), // Debe contener al menos una letra mayúscula
        Validators.minLength(8), // Longitud mínima de 8 dígitos
        Validators.maxLength(20) // Longitud máxima de 20 dígitos
      ]],
      userPassword: ['', [
        Validators.required,
        Validators.pattern(/.*[\W_].*/), // Debe contener al menos un signo
        Validators.pattern(/.*[A-Z].*/), // Debe contener al menos una letra mayúscula
        Validators.pattern(/^\S*$/), // No debe contener espacios en blanco
        Validators.minLength(8), // Longitud mínima de 8 caracteres
        Validators.maxLength(50) // Longitud máxima de 50 caracteres
      ]],
      userEmail: ['', [
        Validators.required,
        Validators.email, // Validar como dirección de correo electrónico
        Validators.maxLength(120) // Longitud máxima de 120 caracteres
      ]],
      userRole: ['', Validators.required]
    });
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/dashboard']);
  }

  registerUser() {
    if (this.registerForm.get('userEmail')?.valid) {
      alert(this.registerForm.get('userEmail')?.getRawValue());
    }
  }

  generateEmail() {
    let firstName = (this.registerForm.get('personFirstName')?.value || '').trim().replace(/\s+/g, '');
    let lastName = (this.registerForm.get('personLastName')?.value || '').trim().replace(/\s+/g, '');
    // Remover caracteres especiales y tildes de los nombres
    firstName = this.removeSpecialCharacters(firstName);
    lastName = this.removeSpecialCharacters(lastName);
    const email = `${firstName.toLowerCase().charAt(0)}${lastName.toLowerCase()}@mail.com`;
    this.registerForm.get('userEmail')?.setValue(email);
  }

  removeSpecialCharacters(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '');
  }



  searchEmail() {
    // Obtener el valor del campo de correo electrónico
    const email = this.registerForm.get('userEmail')?.value;
    this.spinner.show();
    this._userService.getUserByEmail(email).subscribe(
      {
        next: (rs: ApiResponseI<any>) => {
          this.spinner.hide();
          this.registerForm.get('userEmail')?.setValue(rs.data);
        },
        error: (error: HttpErrorResponse) => {
          this.spinner.hide();
        },
        complete: () => {
          alert("complete");
        },
      }
    );
  }
}

