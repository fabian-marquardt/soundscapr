import { Injectable } from '@angular/core';
import * as ResonanceAudio from 'resonance-audio';
import { AudioSource, Listener, Soundscape, SoundscapeEvent, AudioSourceAddedEvent, AudioSourceDeletedEvent, ListenerPositionChangedEvent, AudioSourcePositionChangedEvent, RoomChangedEvent } from '../interfaces';

interface ResonanceAudioSource {
  audioSource: AudioSource;
  mediaElementSource: MediaElementAudioSourceNode,
  sceneSource: ResonanceAudio.Source
}

@Injectable({
  providedIn: 'root'
})
export class ResonanceService {
  context: AudioContext;
  gain: GainNode;
  scene: ResonanceAudio.ResonanceAudio;
  soundscape: Soundscape;
  audioSources: Map<string,ResonanceAudioSource>;
  
  constructor() { 
    this.context = new AudioContext();
    this.gain = this.context.createGain();
    this.scene = new ResonanceAudio.ResonanceAudio(this.context, { ambisonicOrder: 1 });
    this.scene.output.connect(this.gain);
    this.gain.connect(this.context.destination);
    this.audioSources = new Map<string, ResonanceAudioSource>();
  }

  public resume() {
    this.context.resume();
  }
  
  public setSoundscape(soundscape: Soundscape){
    this.soundscape = soundscape;
    this.updateRoomProperties();
    this.soundscape.audioSources.forEach((value: AudioSource) => {
      this.addAudioSource(value);
    });
    this.scene.setListenerPosition(soundscape.listener.x, soundscape.listener.y, 0);
    
    soundscape.events.subscribe((event: SoundscapeEvent) => {
      switch (event.type) {
        case 'AudioSourceAdded':
        this.handleAudioSourceAddedEvent(<AudioSourceAddedEvent> event);
        break;
        case 'AudioSourceDeleted':
        this.handleAudioSourceDeletedEvent(<AudioSourceDeletedEvent> event);
        break;
        case 'ListenerPositionChanged':
        this.handleListenerPositionChanged(<ListenerPositionChangedEvent> event);
        break;
        case 'AudioSourcePositionChanged':
        this.handleAudioSourcePositionChanged(<AudioSourcePositionChangedEvent> event);
        break;
        case 'RoomChanged':
        this.handleRoomChanged(<RoomChangedEvent> event);
        break;
        default:
        console.log('Received unknown event type: ' + event.type);
        break;
      }
    });
  }
  
  private handleAudioSourceAddedEvent(event: AudioSourceAddedEvent){
    this.addAudioSource(event.audioSource);
  }
  
  private handleAudioSourceDeletedEvent(event: AudioSourceDeletedEvent){
    this.deleteAudioSource(event.audioSource);
  }
  
  private handleListenerPositionChanged(event: ListenerPositionChangedEvent){
    this.scene.setListenerPosition(this.soundscape.listener.x, this.soundscape.listener.y, 0);
  }
  
  private handleAudioSourcePositionChanged(event: AudioSourcePositionChangedEvent){
    this.audioSources.get(event.audioSource.uuid).sceneSource.setPosition(event.audioSource.x, event.audioSource.y, 0);  
  }
  
  private handleRoomChanged(event: RoomChangedEvent){
    this.updateRoomProperties();
  }
  
  private updateRoomProperties(){
    
    let roomSize = {
      width: this.soundscape.room.width,
      height: this.soundscape.room.height,
      depth: this.soundscape.room.height
    };
    
    let roomMaterials = {
      left: this.soundscape.room.left.identifier,
      right: this.soundscape.room.right.identifier,
      front: this.soundscape.room.front.identifier,
      back: this.soundscape.room.back.identifier,
      down: this.soundscape.room.down.identifier,
      up: this.soundscape.room.up.identifier
    }
    
    this.scene.setRoomProperties(roomSize, roomMaterials);
  }
  
  private addAudioSource(source: AudioSource){
    let mediaElementSource = this.context.createMediaElementSource(source.audio);
    let sceneSource = this.scene.createSource();
    mediaElementSource.connect(sceneSource.input);
    sceneSource.setPosition(source.x, source.y, 0);
    
    this.audioSources.set(source.uuid, {audioSource: source, mediaElementSource: mediaElementSource, sceneSource: sceneSource});
  }
  
  private deleteAudioSource(source: AudioSource){
    this.audioSources.get(source.uuid).mediaElementSource.disconnect();
  }
  
}
