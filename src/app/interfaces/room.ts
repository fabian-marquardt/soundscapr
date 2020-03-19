import { SurfaceMaterial } from './surface-material';

export class Room {
    left: SurfaceMaterial;
    right: SurfaceMaterial;
    front: SurfaceMaterial;
    back: SurfaceMaterial;
    down: SurfaceMaterial;
    up: SurfaceMaterial;
    width: number;
    height: number;
    depth: number;

    constructor(
        width: number,
        height: number,
        depth: number,
        left: SurfaceMaterial,
        right: SurfaceMaterial,
        front: SurfaceMaterial,
        back: SurfaceMaterial,
        down: SurfaceMaterial,
        up: SurfaceMaterial
    ){
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.left = left;
        this.right = right;
        this.front = front;
        this.back = back;
        this.down = down;
        this.up = up;
    }
}
