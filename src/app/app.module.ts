import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import '@angular/common/locales/global/pt';
import { NgxMaskModule } from 'ngx-mask';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'ptBr');

// views
import { MainComponent } from './views/main/main.component';

// components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ImgDialogComponent } from './components/img-dialog/img-dialog.component';
import { EditarImovelDialogComponent } from './components/editar-imovel/editar-imovel.component';
import { EditarCorretorDialogComponent } from './components/editar-corretor/editar-corretor.component';
import { EditarVendaDialogComponent } from 'src/app/components/editar-venda/editar-venda.component';

// pages
import { ImoveisComponent } from './pages/imoveis/imoveis.component';
import { CorretoresComponent } from './pages/corretores/corretores.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { PagamentosComponent } from './pages/pagamentos/pagamentos.component';
import { RelatoriosComponent } from './pages/relatorios-gerais/relatorios.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    ImoveisComponent,
    ImgDialogComponent,
    EditarImovelDialogComponent,
    NavbarComponent,
    CorretoresComponent,
    EditarCorretorDialogComponent,
    VendasComponent,
    EditarVendaDialogComponent,
    PagamentosComponent,
    RelatoriosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
