import { Injectable } from '@angular/core';
import { Soundscape } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SoundscapeStorageService {

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
