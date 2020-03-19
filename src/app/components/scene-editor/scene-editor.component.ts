import { Component, OnInit } from '@angular/core';
import { AudioSource, SoundClip, Soundscape } from '../../interfaces';
import { ResonanceService, SoundRegistryService, SoundscapeStorageService } from '../../services';

import * as L from 'leaflet';

@Component({
    selector: 'app-scene-editor',
    templateUrl: './scene-editor.component.html',
    styleUrls: ['./scene-editor.component.css']
})
export class SceneEditorComponent implements OnInit {
    public soundscape: Soundscape;
    public soundClips: SoundClip[];
    
    private map: L.Map;
    private roomRect: L.Rectangle;
    private markers: Map<string, L.Marker>;
    public layers: L.Layer[] = [];
    
    options: any = {
        crs: L.CRS.Simple,
        // layers: this.layers,
        zoom: 6,
        center: [0, 0],
        attributionControl: false,
        zoomControl: false
    }
    
    constructor(
        private resonanceService: ResonanceService,
        private soundRegistryService: SoundRegistryService,
        private soundscapeStorageService: SoundscapeStorageService
    ) { }
    
    ngOnInit() {
        this.soundClips = this.soundRegistryService.getSoundClips();
        this.soundscape = Soundscape.createEmpty();
    }

    onMapReady(map: L.Map) {
        this.map = map;
        let zoomControl = new L.Control.Zoom({ position: 'topright' });
        zoomControl.addTo(this.map);
        this.initializeSoundscape();
    }

    initializeSoundscape() {
        this.markers = new Map<string, L.Marker>();
        this.layers = [];
        
        this.resonanceService.setSoundscape(this.soundscape);

        this.roomRect = new L.Rectangle([[-this.soundscape.room.depth/2, -this.soundscape.room.width/2], [this.soundscape.room.depth/2, this.soundscape.room.width/2]], {color: '#333333', weight: 2, interactive: false});

        this.layers.push(this.roomRect);

        let divIcon = new L.DivIcon({
            html: '<button class="btn btn-primary dragbtn"><i class="fas fa-headphones-alt"></i></button>',
            className: ''
        })
        let listener_marker = new L.Marker(
            [this.soundscape.listener.y, this.soundscape.listener.x],
            {
                draggable: true,
                icon: divIcon
            }
        );
        this.layers.push(listener_marker);

        listener_marker.addEventListener('move', (event: any) => {
            this.soundscape.setListenerPosition(event.latlng.lng, event.latlng.lat);
        });

        this.soundscape.audioSources.forEach((value: AudioSource) => {
            this.addSourceMarker(value);
        });

        this.map.fitBounds(this.roomRect.getBounds());
    }
    
    onSoundClipPicked(soundClip: SoundClip) {
        this.resonanceService.resume();
        let source = new AudioSource(0, 0);
        source.soundClip = soundClip;
        this.soundscape.addSource(source);
        this.addSourceMarker(source);
        source.audio.addEventListener('canplay', () => { source.audio.play()});
    }

    addSourceMarker(source: AudioSource) {
        let divIcon = new L.DivIcon({
            html: '<button style="background-color: ' + source.color + '; background-image: none" class="btn btn-primary dragbtn"><i class="fas fa-volume-up"></i></button>',
            className: ''
        })
        let source_marker = new L.Marker(
            [source.y, source.x],
            {
                draggable: true,
                icon: divIcon
            }
        );
        this.layers.push(source_marker);
        source_marker.addEventListener('move', (event: any) => {
            this.soundscape.setAudioSourcePosition(source, event.latlng.lng, event.latlng.lat);
        });
        this.markers.set(source.uuid, source_marker);
    }
    
    deleteSource(source: AudioSource) {
        this.markers.get(source.uuid).remove();
        this.markers.delete(source.uuid);
        this.soundscape.deleteSource(source);
    }
    
    deleteAllSources() {
        this.markers.forEach((value: L.Marker) => {
            value.remove();
        });
        this.markers.clear();
        this.soundscape.deleteAllSources();
    }
    
    startAllSources() {
        this.resonanceService.resume();
        this.soundscape.audioSources.forEach((value: AudioSource) => {
            value.start();
        });
    }
    
    stopAllSources() {
        this.soundscape.audioSources.forEach((value: AudioSource) => {
            value.stop();
        });
    }
    
    onRoomChanged() {
        this.roomRect.setBounds(new L.LatLngBounds([-this.soundscape.room.depth/2, -this.soundscape.room.width/2], [this.soundscape.room.depth/2, this.soundscape.room.width/2]));
        this.soundscape.updateRoomProperties();
    }

    updateColor(source: AudioSource) {
        this.markers.get(source.uuid).setIcon(new L.DivIcon({
            html: '<button style="background-color: ' + source.color + '; background-image: none" class="btn btn-primary dragbtn"><i class="fas fa-volume-up"></i></button>',
            className: ''
        }));
     
    }

    onSaveSoundscape(name: string) {
        this.soundscape.name = name;
        this.soundscapeStorageService.save(this.soundscape);
    }

    onLoadSoundscape(name: string){
        this.soundscape.deleteAllSources();
        this.soundscape = this.soundscapeStorageService.load(name);
        this.initializeSoundscape();
    }

    onNewSoundscape(){
        this.soundscape.deleteAllSources();
        this.soundscape = Soundscape.createEmpty();
        this.initializeSoundscape();
    }

    getGain() : AudioParam{
        return this.resonanceService.gain.gain;
    }
}
    