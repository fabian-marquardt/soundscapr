import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SurfaceMaterial, SurfaceMaterials } from '../../interfaces';

@Component({
  selector: 'wall-material-selector',
  templateUrl: './wall-material-selector.component.html',
  styleUrls: ['./wall-material-selector.component.css']
})
export class WallMaterialSelectorComponent {

  @Input() wallName: string;
  @Input() wallMaterial: SurfaceMaterial;
  @Output() wallMaterialChange = new EventEmitter<SurfaceMaterial>();

  getSurfaceMaterials(): SurfaceMaterial[] {
    return Object.values(SurfaceMaterials);
  }

  onChange() {
    this.wallMaterialChange.emit(this.wallMaterial);
  }

}
