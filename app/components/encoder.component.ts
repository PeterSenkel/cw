import {Component, Input} from 'angular2/core';
import {LetterService} from './service/letter.service';
import {Letter} from './models/letter';
import {Settings} from './models/settings';
import {EncodingService} from './service/encoding.service';

const TEMPLATE = `
<div class="encoder col-xs-12 text-left">
    <div class="leds">
        <a [ngClass]="{ 'led-green-on': meter }" class="btn btn-default led-1 led-green led-green-on"></a>
        <a [ngClass]="{ 'led-green-on': isLampOn() }" class="btn btn-default led-2 led-green "></a>
        <a [ngClass]="{ 'led-green-on': isLampOn() }" class="btn btn-default led-3 led-green "></a>
        <a [ngClass]="{ 'led-green-on': isLampOn() }" class="btn btn-default led-4 led-green "></a>
        <a [ngClass]="{ 'led-green-on': isLampOn() }" class="btn btn-default led-5 led-green "></a>
        <a [ngClass]="{ 'led-red-on': isLampOn() }" class="btn btn-default led-6 led-red "></a>
        <a class="btn btn-default led-7 led-red "></a>
    </div>
    
    <a (click)="start()" class="btn btn-default start">
        {{ getText() }}
    </a>
    
    <a (click)="toggleMeter()" class="btn btn-default meter">
        meter
    </a>
</div>
`;

@Component({
    selector: 'encoder',
    template: TEMPLATE
})
export class EncoderComponent {
    @Input() settings: Settings;

    public randomLetters: Letter[];
    public meter: boolean = true;

    public constructor(private letterService: LetterService, private encodingService: EncodingService) {
    }

    public start(): void {
        this.randomLetters = this.letterService.getRandomLetters(this.settings);
        this.encodingService.encodeLetters(this.randomLetters, this.settings);
    }

    public getText(): string {
        if (!this.encodingService.playing) {
            return 'on';
        }

        if (this.encodingService.countDownNumber > 0) {
            return this.encodingService.countDownNumber.toString();
        }

        return 'off';
    }

    public toggleMeter(): void {
        this.meter = !this.meter;
    }

    public isLampOn(): boolean {
        return this.encodingService.signal && this.meter;
    }
}
