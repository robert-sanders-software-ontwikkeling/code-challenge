import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { applicationSettingsInjectionToken } from './app.model';
import { ImageCardSheetModule } from './components/image-card-sheet/image-card-sheet.module';
import { ImageCardModule } from './components/image-card/image-card.module';
import { ImageModule } from './components/image/image.module';
import { ToolbarModule } from './components/toolbar/toolbar.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    ToolbarModule,
    ImageModule,
    ImageCardModule,
    ImageCardSheetModule
  ],
  providers: [
    {
      provide: applicationSettingsInjectionToken,
      useFactory: () => environment
    }
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
