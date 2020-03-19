import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'soundscape-save-modal',
  templateUrl: './soundscape-save-modal.component.html',
  styleUrls: ['./soundscape-save-modal.component.css']
})
export class SoundscapeSaveModalComponent {

  @Input() soundscapeName: string;
  @Output() soundscapeSaveEvent = new EventEmitter<string>();

  save() {
    this.soundscapeSaveEvent.emit(this.soundscapeName);
  }

}
