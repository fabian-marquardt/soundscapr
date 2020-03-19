import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';

import { ResonanceService, SoundRegistryService, SoundscapeStorageService } from './services';
import { SceneEditorComponent, SoundPickerComponent, RoomSettingsComponent, WallMaterialSelectorComponent, EditableLabelComponent, SoundscapeLoadModalComponent, SoundscapeSaveModalComponent } from './components';


@NgModule({
  declarations: [
    AppComponent,
    SceneEditorComponent,
    SoundPickerComponent,
    RoomSettingsComponent,
    WallMaterialSelectorComponent,
    EditableLabelComponent,
    SoundscapeLoadModalComponent,
    SoundscapeSaveModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: SceneEditorComponent
      }
    ]),
    LeafletModule.forRoot()
  ],
  providers: [
    ResonanceService,
    SoundRegistryService,
    SoundscapeStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
