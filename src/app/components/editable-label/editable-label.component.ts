import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'editable-label',
  templateUrl: './editable-label.component.html',
  styleUrls: ['./editable-label.component.css']
})
export class EditableLabelComponent {
  public editing: boolean = false;
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  startEdit(){
    this.editing = true;
  }

  stopEdit(){
    this.valueChange.emit(this.value);
    this.editing = false;
  }
}
