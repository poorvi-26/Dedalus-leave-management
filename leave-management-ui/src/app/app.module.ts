import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonComponentModule } from "./modules/common/common.modules";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [AppComponent],
  imports:[CommonComponentModule,BrowserModule, AppRoutes, HttpClientModule, NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(), BrowserAnimationsModule],
  bootstrap: [AppComponent],
})

export class AppModule {}
