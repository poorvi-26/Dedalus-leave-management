import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from "ngx-toastr";
import { HeaderComponent } from "./components/header/header.component";
import { LoginComponent } from "./components/login/login.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoginComponent],
  imports:[BrowserModule, AppRoutes, HttpClientModule, NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(), BrowserAnimationsModule, FormsModule, CommonModule],
  bootstrap: [AppComponent],
})

export class AppModule {}
