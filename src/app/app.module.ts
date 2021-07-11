import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserRegisterComponent } from './pages/user-register/user-register.component';

// views
import { MainComponent } from './views/main/main.component';

// components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ImgDialogComponent } from './components/img-dialog/img-dialog.component';
import { EditarImovelDialogComponent } from './components/editar-imovel/editar-imovel.component';

// pages
import { ImoveisComponent } from './pages/imoveis/imoveis.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    ImoveisComponent,
    ImgDialogComponent,
    EditarImovelDialogComponent,
    NavbarComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
