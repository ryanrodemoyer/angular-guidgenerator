import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { GuidGeneratorComponent } from './components/guid-generator/guid-generator.component';

import { GuidInfoComponent } from './components/guid-info/guid-info.component';
import { UuidService } from './services/uuid.service';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot([]), ],
  declarations: [ AppComponent, HelloComponent, GuidGeneratorComponent, GuidInfoComponent ],
  bootstrap:    [ AppComponent ],
  providers: [UuidService]
})
export class AppModule { }
