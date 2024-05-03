import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      personFirstName: ['', [Validators.required,Validators.maxLength(60)]],
      personLastName: ['',  [Validators.required,Validators.maxLength(60)]],
      personIdentification:['',[Validators.required,Validators.minLength(10),Validators.pattern('\\d{10}')]],
      personBirthDate:['',Validators.required],
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

  registerUser(){

  }

}
