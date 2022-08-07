import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FqaModule } from './fqas/fqa.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { FotterComponent } from './layout/fotter/fotter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FotterComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FqaModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
