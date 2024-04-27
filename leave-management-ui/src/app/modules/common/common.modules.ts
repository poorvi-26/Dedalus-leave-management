import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


const routes : Routes = [{
  path: '',
  component: LoginComponent
}
]

@NgModule({
  declarations:[LoginComponent, HeaderComponent],
  imports: [RouterModule.forChild(routes), FormsModule, CommonModule],
  exports: [HeaderComponent],
  providers: []
})


export class CommonComponentModule {}
