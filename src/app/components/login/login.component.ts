import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios.interfaces';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  usuario!: Usuarios;
  loginForm: FormGroup;
  registerForm: FormGroup;
  selected = new FormControl(0);

  constructor(
    private _builder: FormBuilder,
    private usuariosService: UsuariosService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.loginForm = this._builder.group({
      CorreoElectronico: ['', Validators.compose([Validators.email, Validators.required])],
      Contraseña: ['', Validators.required]
    });
    this.registerForm = this._builder.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      CorreoElectronico: ['', Validators.compose([Validators.email, Validators.required])],
      Telefono: ['', Validators.required],
      Contraseña: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    sessionStorage.setItem('isAuthorized', JSON.stringify(false));
  }

  Ingresar(){
    this.usuario = {
      correoElectronico: this.loginForm.value.CorreoElectronico,
      contraseña: this.loginForm.value.Contraseña
    }

    this.usuariosService.login(this.usuario).subscribe(res => {
      sessionStorage.setItem('token', JSON.stringify(res.response));
      sessionStorage.setItem('isAuthorized', JSON.stringify(true));
      this.router.navigate(['dashboard'])
    },
    err => {
      this.error();
      this.loginForm.reset();
    })
  }

  Registrar(){

    this.usuario = {
      nombres: this.registerForm.value.Nombres,
      apellidos: this.registerForm.value.Apellidos,
      correoElectronico: this.registerForm.value.CorreoElectronico,
      telefono: this.registerForm.value.Telefono,
      contraseña: this.registerForm.value.Contraseña
    }

    this.usuariosService.register(this.usuario).subscribe(res => {
      if(res != null){
        this.selected.setValue(0);
      }
      else{
        this.error();
        this.registerForm.reset();
      }
    })
  }

  error(){
    this._snackBar.open('Correo Electronico o contraseña ingresado son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }
}
