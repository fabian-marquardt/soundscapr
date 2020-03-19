import { Room } from './room';
import { AudioSource } from './audio-source';
import { Listener } from './listener';
import { EventEmitter } from '@angular/core';
import { SurfaceMaterials } from './surface-material';
import { SoundClip } from './sound-clip';

export interface SoundscapeEvent {
    type: string;
}

export class RoomChangedEvent implements SoundscapeEvent {
    type: string;
    
    constructor(){
        this.type = 'RoomChanged';
    }
}

export class AudioSourceAddedEvent implements SoundscapeEvent {
    type: string;
    audioSource: AudioSource;
    
    constructor(audioSource: AudioSource){
        this.type = 'AudioSourceAdded';
        this.audioSource = audioSource;
    }
}

export class AudioSourceDeletedEvent implements SoundscapeEvent {
    type: string;
    audioSource: AudioSource;
    
    constructor(audioSource: AudioSource){
        this.type = 'AudioSourceDeleted';
        this.audioSource = audioSource;
    }
}

export class ListenerPositionChangedEvent implements SoundscapeEvent {
    type: string;
    
    constructor(){
        this.type = 'ListenerPositionChanged';
    }
}

export class AudioSourcePositionChangedEvent implements SoundscapeEvent {
    type: string;
    audioSource: AudioSource;
    
    constructor(audioSource: AudioSource){
        this.type = 'AudioSourcePositionChanged';
        this.audioSource = audioSource;
    }
}

export class Soundscape {
    room: Room;
    audioSources: Map<string, AudioSource>;
    listener: Listener;
    events: EventEmitter<SoundscapeEvent>;
    name: string;
    private _loadingSources: number;
    
    constructor(room: Room, listener: Listener){
        this.room = room;
        this.listener = listener;
        this.audioSources = new Map<string, AudioSource>();
        this.events = new EventEmitter<SoundscapeEvent>();
        this.name = 'Unnamed Soundscape';
        this._loadingSources = 0;
    }

    toJson(): string {
        let result = {
            listener: {
                x: this.listener.x,
                y: this.listener.y
            },
            room: {
                width: this.room.width,
                height: this.room.height,
                depth: this.room.depth,
                left: this.room.left.identifier,
                right: this.room.right.identifier,
                front: this.room.front.identifier,
                back: this.room.back.identifier,
                up: this.room.up.identifier,
                down: this.room.down.identifier,
            },
            sources: []
        };
        this.audioSources.forEach((value: AudioSource) => {
            result.sources.push({
                x: value.x,
                y: value.y,
                title: value.title,
                file: value.soundClip.file,
                volume: value.audio.volume,
                offset: value.offset,
                color: value.color
            });
        });
        return JSON.stringify(result);

    }

    static fromJson(json: string): Soundscape {
        let obj = JSON.parse(json);
        let room = new Room(
            obj.room.width,
            obj.room.height,
            obj.room.depth,
            SurfaceMaterials.byIdentifier(obj.room.left),
            SurfaceMaterials.byIdentifier(obj.room.right),
            SurfaceMaterials.byIdentifier(obj.room.front),
            SurfaceMaterials.byIdentifier(obj.room.back),
            SurfaceMaterials.byIdentifier(obj.room.down),
            SurfaceMaterials.byIdentifier(obj.room.up),
        );
        let listener = new Listener(obj.listener.x, obj.listener.y);
        let soundscape = new Soundscape(room, listener);
        for(let item of obj.sources){
            let clip: SoundClip = { title: item.title, file: item.file};
            let source = new AudioSource(item.x, item.y, clip, item.offset);
            source.audio.volume = item.volume;
            source.color = item.color;
            soundscape.addSource(source);
        }
        return soundscape;
    }

    static createEmpty(): Soundscape {
        let room = new Room(
            5,
            3,
            5,
            SurfaceMaterials.Transparent,
            SurfaceMaterials.Transparent,
            SurfaceMaterials.Transparent,
            SurfaceMaterials.Transparent,
            SurfaceMaterials.Transparent,
            SurfaceMaterials.Transparent
        );
        let listener = new Listener(0, 0);

        return new Soundscape(room, listener);
    }
    
    addSource(source: AudioSource) {
        source.loadingDone.subscribe(() => {
            this.updateLoadingSources();
        });
        this.audioSources.set(source.uuid, source);
        this.events.emit(new AudioSourceAddedEvent(source));
        this.updateLoadingSources();
    }
    
    deleteSource(source: AudioSource) {
        this.events.emit(new AudioSourceDeletedEvent(source));
        this.audioSources.delete(source.uuid);
        source.delete();
        this.updateLoadingSources();
    }
    
    deleteAllSources() {
        this.audioSources.forEach((value: AudioSource) => {
            this.events.emit(new AudioSourceDeletedEvent(value));
            value.delete();
        });
        this.audioSources.clear();
        this.updateLoadingSources();
    }
    
    setListenerPosition(x: number, y: number) {
        this.listener.x = x;
        this.listener.y = y;
        this.events.emit(new ListenerPositionChangedEvent());
    }
    
    setAudioSourcePosition(source: AudioSource, x: number, y:number){
        if(this.audioSources.has(source.uuid)){
            source.x = x;
            source.y = y;
            this.events.emit(new AudioSourcePositionChangedEvent(source));
        }
    }
    
    updateRoomProperties(){
        this.events.emit(new RoomChangedEvent());
    }

    get loadingSources(): number {
        return this._loadingSources;
    }

    private updateLoadingSources() {
        let loading = 0;
        this.audioSources.forEach((value: AudioSource) => {
            if(value.isLoading){
                loading ++;
            }
        });
        this._loadingSources = loading;
    }
}
