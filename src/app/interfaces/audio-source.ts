import { SoundClip } from './sound-clip';
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from '@angular/core';

export class AudioSource {
    uuid: string;
    title: string;
    color: string = '#3333DD';
    x: number;
    y: number;
    offset: number;
    audio: HTMLAudioElement;
    private _soundClip: SoundClip;
    private duration: number;
    isLoading: boolean;
    loadingDone: EventEmitter<void>;

    constructor(x: number, y: number, soundClip: SoundClip = null, offset: number = 0) {
        this.uuid = uuidv4();
        this.x = x;
        this.y = y;
        this._soundClip = soundClip;
        this.audio = new Audio();
        this.duration = 0;
        this.loadingDone = new EventEmitter<void>();
        this.isLoading = true;

        this.audio.addEventListener('durationchange', () => {
            this.isLoading = false;
            this.duration = this.audio.duration;
        });

        this.audio.addEventListener('canplaythrough', () => {
            this.loadingDone.emit();
        });

        if(this._soundClip){
            this.loadClip();
        }
        else {
            this.title = 'New Audio Source';
        }
        this.offset = offset;
    }

    set soundClip(soundClip: SoundClip){
        this._soundClip = soundClip;
        this.loadClip();
        //this.start();
    }

    get soundClip(): SoundClip {
        return this._soundClip;
    }

    private loadClip(){
        this.title = this._soundClip.title;

        //this.audio.src = 'assets/sounds/' + this._soundClip.file + '?' + this.uuid;
        this.audio.src = 'assets/sounds/' + this._soundClip.file;
        this.audio.load();
        this.audio.loop = true;
    }

    public delete(){
        delete this.audio;
    }

    public start(){
        this.audio.currentTime = this.offset * this.duration;
        this.audio.play();
    }
    public stop(){
        this.audio.pause();
    }

}