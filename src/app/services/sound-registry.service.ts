import { Injectable } from '@angular/core';
import { SoundClip } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SoundRegistryService {

  soundClips: SoundClip[] = [
    {title: 'Cheap radio', file: 'background_music_cheap_radio.wav'},
    {title: 'Banjo', file: 'banjo.wav'},
    {title: 'Bottle caps', file: 'bottlecaps.wav'},
    {title: 'Box with small items', file: 'box_small_items.wav'},
    {title: 'Cabinet door', file: 'cabinet_door.wav'},
    {title: 'Glasses/Bottles (clinking)', file: 'clinking.wav'},
    {title: 'Clothing', file: 'clothing_rustling.wav'},
    {title: 'Coffee beans', file: 'coffee_beans.wav'},
    {title: 'Crowd 2 (talking)', file: 'crowd2.wav'},
    {title: 'Crowd 3 (talking)', file: 'crowd3.wav'},
    {title: 'Cutlery 1', file: 'cutlery1.wav'},
    {title: 'Cutlery 2', file: 'cutlery2.wav'},
    {title: 'Dishes 1', file: 'dishes1.wav'},
    {title: 'Dishes 2', file: 'dishes2.wav'},
    {title: 'Dock ramp (creaking)', file: 'dock_creak.wav'},
    {title: 'Wooden door', file: 'door.wav'},
    {title: 'Drawer 1', file: 'drawer1.wav'},
    {title: 'Drawer 2', file: 'drawer2.wav'},
    {title: 'Acoustic guitar', file: 'guitar.wav'},
    {title: 'Hammer 1', file: 'hammer1.wav'},
    {title: 'Hammer 2', file: 'hammer2.wav'},
    {title: 'Hammer 3', file: 'hammer3.wav'},
    {title: 'Impacts (heavy)', file: 'impact_heavy.wav'},
    {title: 'Impacts (light)', file: 'impact_light.wav'},
    {title: 'Paper (flapping/crumbling)', file: 'paper_flapping.wav'},
    {title: 'Person with dolly', file: 'person_with_dolly.wav'},
    {title: 'Plank steps', file: 'plank_steps.wav'},
    {title: 'Beer tap', file: 'pouring.wav'},
    {title: 'Saw 1', file: 'saw1.wav'},
    {title: 'Saw 2', file: 'saw2.wav'},
    {title: 'Scrap metal', file: 'scrap_metal.wav'},
    {title: 'Seagulls 1', file: 'seagull1.wav'},
    {title: 'Seagulls 2', file: 'seagull2.wav'},
    {title: 'Ship bell', file: 'ship_bell.wav'},
    {title: 'Sliding cabinet door', file: 'sliding_cabinet_door.wav'},
    {title: 'Crowd (talking)', file: 'talking.wav'},
    {title: 'Violin', file: 'violin.wav'},
    {title: 'Waves/Shore', file: 'waves.wav'},
    {title: 'Waves at harbor', file: 'waves_harbor.wav'},
    {title: 'Wind howling', file: 'wind_howling.wav'},
    {title: 'Wood (creaking)', file: 'wood_creaking.wav'},
  ];

  constructor() { }

  public getSoundClips() : SoundClip[] {
    return this.soundClips.sort((a, b) => a.title.localeCompare(b.title));
  }
}
