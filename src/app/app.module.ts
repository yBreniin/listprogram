import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { CoreModule } from './core/core.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { TableComponent } from './table/table.component';
import {MatSelectModule} from '@angular/material/select';
import { AddtodosComponent } from './edit/addtodos/addtodos.component';
import { EditodosComponent } from './edit/editodos/editodos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskSelectionService } from './edit/task-selection.service';


@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    TableComponent,
    AddtodosComponent,
    EditodosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    CoreModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [TaskSelectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
