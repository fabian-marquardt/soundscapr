import { Component, Output, EventEmitter } from '@angular/core';
import { SoundscapeStorageService } from '../../services';

@Component({
  selector: 'soundscape-load-modal',
  templateUrl: './soundscape-load-modal.component.html',
  styleUrls: ['./soundscape-load-modal.component.css']
})
export class SoundscapeLoadModalComponent {

  public soundscapeName: string = '';
  @Output() soundscapeLoadEvent = new EventEmitter<string>();

  constructor(
    private soundscapeStorageService: SoundscapeStorageService
  ) { }

  getSoundscapesList(): string[] {
    return this.soundscapeStorageService.list();
  }

  load() {
    this.soundscapeLoadEvent.emit(this.soundscapeName);
  }

}
