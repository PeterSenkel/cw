import {Component, EventEmitter} from 'angular2/core';
import {Settings} from './models/settings';
import {Letter} from './models/letter';
import {LetterService} from './service/letter.service';
import {LettersComponent} from './letters.component';
import {SettingsComponent} from './settings.component';
import {EncoderComponent} from './encoder.component';
import {ResultsComponent} from './results.component';

const TEMPLATE = `
<div class="row text-center">
    <div class="col-xs-12">
        <h1>CW Koch Trainer</h1>
    </div>
    <div class="col-xs-6 text-left">
        <encoder [settings]="settings"></encoder>
    </div>
    <div class="col-xs-6 text-left">
        <settings [letters]="letters" (onSettingsChanged)="onSettingsChanged($event)"></settings>
    </div>
</div>
<div class="row text-center">
    <div class="col-xs-12">
        <letters [letters]="letters" 
                 [settings]="settings"
                 [onSettingsChanged]="changeSettings">
        </letters>
    </div>
</div>
<results></results>
`;

@Component({
    selector: 'main',
    providers: [Settings],
    directives: [SettingsComponent, EncoderComponent, LettersComponent, ResultsComponent],
    template: TEMPLATE
})
export class AppComponent {
    public settings: Settings;
    public letters: Letter[];
    public changeSettings = new EventEmitter();

    public constructor(private letterService: LetterService) {
        this.letters = this.letterService.getLetters();
    }

    public onSettingsChanged(event) {
        this.settings = new Settings(event);
        this.changeSettings.emit(event);
    }
}
