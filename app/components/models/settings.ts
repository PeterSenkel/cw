import {Injectable} from 'angular2/core';
export class SettingsDto {
    public wpm: string;
    public speed: string;
    public level: string;
    public duration: string;
    public freq: string;
}

@Injectable()
export class Settings {
    public wpm: number;
    public speed: number;
    public level: number;
    public duration: number;
    public freq: number;
    public dotLength: number;
    public dashLength: number;
    public farnsworthFactor: number;
    public letterPauseLength: number;
    public wordPauseLength: number;

    public constructor(dto: SettingsDto) {
        this.wpm = parseInt(dto.wpm);
        this.speed = parseInt(dto.speed);
        this.level = parseInt(dto.level);
        this.duration = parseInt(dto.duration);
        this.freq = parseInt(dto.freq);
        this.dotLength = (1200 / this.wpm);
        this.dashLength = 3 * this.dotLength;
        this.farnsworthFactor = this.wpm / this.speed;
        this.letterPauseLength = this.dotLength * 3 * this.farnsworthFactor;
        this.wordPauseLength = this.dotLength * 7 * this.farnsworthFactor;
    }
}
