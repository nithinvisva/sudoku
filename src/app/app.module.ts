import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AcceptOnlyOneDirective } from './directives/accept-only-one.directive';
import { PreventNumberScrollDirective } from './directives/prevent-number-scroll.directive';
import { MoveToNextDirective } from './directives/move-to-next.directive';

@NgModule({
  declarations: [
    AppComponent,
    AcceptOnlyOneDirective,
    PreventNumberScrollDirective,
    MoveToNextDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
