import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../../interfaces';

@Component({
  selector: 'room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.css']
})
export class RoomSettingsComponent {

  @Input() room: Room;
  @Output() roomChanged = new EventEmitter<void>();

  constructor() { }

  onChange() {
    this.roomChanged.emit();
  }

}
