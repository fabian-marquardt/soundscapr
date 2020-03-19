import { Injectable } from '@angular/core';
import { Soundscape } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SoundscapeStorageService {

  constructor() {
    if(localStorage.length==0){
      localStorage.setItem('Harbor','{"listener":{"x":0.5625,"y":-6.9375},"room":{"width":50,"height":3,"depth":20,"left":"transparent","right":"transparent","front":"transparent","back":"transparent","up":"transparent","down":"plaster-rough"},"sources":[{"x":31,"y":10.4375,"title":"Waves Right","file":"waves.wav","volume":0.5,"offset":0,"color":"#0000ff"},{"x":-6.8125,"y":2.375,"title":"Ship Creaking","file":"wood_creaking.wav","volume":0.2,"offset":0,"color":"#3333DD"},{"x":-5.0625,"y":3.875,"title":"Ship Noise","file":"impact_light.wav","volume":0.85,"offset":0,"color":"#3333DD"},{"x":14.4375,"y":7,"title":"Seagulls 1","file":"seagull1.wav","volume":0.75,"offset":0,"color":"#8000ff"},{"x":-19.75,"y":-8.4375,"title":"Seagulls 2","file":"seagull2.wav","volume":1,"offset":0,"color":"#8000ff"},{"x":21.125,"y":-1,"title":"Waves at harbor Right","file":"waves_harbor.wav","volume":1,"offset":0.4,"color":"#0080ff"},{"x":8,"y":-1.125,"title":"Waves at harbor Mid Right","file":"waves_harbor.wav","volume":1,"offset":0.16,"color":"#0080ff"},{"x":-5.625,"y":-1.25,"title":"Waves at harbor Mid Left","file":"waves_harbor.wav","volume":1,"offset":0.66,"color":"#0080ff"},{"x":-18.5625,"y":-1.25,"title":"Waves at harbor Left","file":"waves_harbor.wav","volume":1,"offset":0,"color":"#0080ff"},{"x":2.5,"y":2.25,"title":"Dock ramp creaking","file":"dock_creak.wav","volume":0.55,"offset":0,"color":"#808080"},{"x":-6.6875,"y":6.3125,"title":"Ship bell","file":"ship_bell.wav","volume":0.45,"offset":0,"color":"#004000"},{"x":-2.5,"y":0.0625,"title":"Plank steps Right","file":"plank_steps.wav","volume":0.6,"offset":0,"color":"#808040"},{"x":-12.8125,"y":-0.875,"title":"Plank steps Left","file":"plank_steps.wav","volume":0.55,"offset":0.36,"color":"#808040"}]}');
      localStorage.setItem('Draughty harbor shack','{"listener":{"x":0.8441985212390657,"y":-1.4375},"room":{"width":5,"height":3,"depth":5,"left":"wood-panel","right":"wood-panel","front":"wood-panel","back":"wood-panel","up":"acoustic-ceiling-tiles","down":"plywood-panel"},"sources":[{"x":3.625,"y":-6.5625,"title":"Waves at harbor right","file":"waves_harbor.wav","volume":0.15,"offset":0.35,"color":"#0000a0"},{"x":-3.03125,"y":-6.4375,"title":"Waves at harbor left","file":"waves_harbor.wav","volume":0.1,"offset":0.68,"color":"#0000a0"},{"x":-8.4375,"y":-8.1875,"title":"Waves/Shore","file":"waves.wav","volume":0.3,"offset":0,"color":"#3333DD"},{"x":1.59375,"y":1.5625,"title":"Paper flapping/crumbling","file":"paper_flapping.wav","volume":0.2,"offset":0,"color":"#3333DD"},{"x":-1.84375,"y":1.90625,"title":"Wind howling left front","file":"wind_howling.wav","volume":0.45,"offset":0,"color":"#408080"},{"x":1.5,"y":-2.46875,"title":"Wind howling right back","file":"wind_howling.wav","volume":0.3,"offset":0.67,"color":"#408080"},{"x":-2.126129609046538,"y":-1.15625,"title":"Wood creaking","file":"wood_creaking.wav","volume":0.3,"offset":0,"color":"#808040"},{"x":-1.6571304305803896,"y":0.71875,"title":"Light Impacts","file":"impact_light.wav","volume":0.8,"offset":0,"color":"#004000"},{"x":0.5471578353472193,"y":1.609375,"title":"Cabinet door","file":"cabinet_door.wav","volume":0.55,"offset":0,"color":"#3333DD"},{"x":2.2667967464384784,"y":0.15625,"title":"Drawer 2","file":"drawer2.wav","volume":0.4,"offset":0,"color":"#3333DD"}]}');
      localStorage.setItem('Tavern at lunchtime', '{"listener":{"x":-0.03129848605952312,"y":-0.5},"room":{"width":6,"height":3,"depth":10,"left":"curtain-heavy","right":"wood-panel","front":"brick-bare","back":"wood-panel","up":"wood-ceiling","down":"parquet-on-concrete"},"sources":[{"x":1.71875,"y":3.5625,"title":"Cabinet door","file":"cabinet_door.wav","volume":0.6,"offset":0,"color":"#400040"},{"x":-1.8134373971507827,"y":0.5625,"title":"Glasses/Bottles (clinking) left","file":"clinking.wav","volume":0.3,"offset":0,"color":"#804000"},{"x":2.376228313507922,"y":-0.3125,"title":"Glasses/Bottles (clinking) right","file":"clinking.wav","volume":0.3,"offset":0.66,"color":"#804000"},{"x":0.8436207038412711,"y":2.25,"title":"Plank steps","file":"plank_steps.wav","volume":0.5,"offset":0,"color":"#0080c0"},{"x":-1.7509050731111007,"y":3.90625,"title":"Sliding cabinet door","file":"sliding_cabinet_door.wav","volume":0.9,"offset":0,"color":"#400080"},{"x":-0.0937984860595229,"y":3.625,"title":"Cutlery 1","file":"cutlery1.wav","volume":0.35,"offset":0,"color":"#3333DD"},{"x":-2.0010343692698296,"y":0.125,"title":"Dishes 1 left","file":"dishes1.wav","volume":0.3,"offset":0,"color":"#0000a0"},{"x":2.470026799567446,"y":0.09375,"title":"Dishes 2 right","file":"dishes2.wav","volume":0.3,"offset":0,"color":"#0000a0"},{"x":2.3449621514880814,"y":-2.53125,"title":"Dishes 1 right","file":"dishes1.wav","volume":0.35,"offset":0.65,"color":"#0000a0"},{"x":-2.454393718557525,"y":0.703125,"title":"Crowd 2 (talking) left","file":"crowd2.wav","volume":0.55,"offset":0,"color":"#408080"},{"x":2.454393718557525,"y":-0.8125,"title":"Crowd 3 (talking) right","file":"crowd3.wav","volume":0.6,"offset":0,"color":"#408080"},{"x":-1.1572035591706253,"y":-3.5625,"title":"Violin","file":"violin.wav","volume":0.65,"offset":0,"color":"#8000ff"}]}');
    }
  }

  save(soundscape: Soundscape){
    let serialized = soundscape.toJson();
    localStorage.setItem(soundscape.name, serialized);
  }

  load(name: string): Soundscape {
    let soundscape = Soundscape.fromJson(localStorage.getItem(name));
    soundscape.name = name;
    return soundscape;
  }

  list(): string[] {
    let result = [];
    for(let i=0;i<localStorage.length;i++){
      result.push(localStorage.key(i));
    }
    return result;
  }

}
