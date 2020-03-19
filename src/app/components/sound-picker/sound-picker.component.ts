import { Component, Output, EventEmitter } from '@angular/core';
import { SoundClip } from '../../interfaces';
import { SoundRegistryService } from '../../services';

@Component({
  selector: 'sound-picker',
  templateUrl: './sound-picker.component.html',
  styleUrls: ['./sound-picker.component.css']
})
export class SoundPickerComponent {

  soundClip: SoundClip;
  @Output() soundClipPicked = new EventEmitter<SoundClip>();

  constructor(private soundRegistryService: SoundRegistryService) { }

  getSoundClips(): SoundClip[] {
    return this.soundRegistryService.getSoundClips();
  }

  pick() {
    this.soundClipPicked.emit(this.soundClip);
  }

}
