import {Component} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {Input} from 'angular2/core';
import {Output} from 'angular2/core';
import {Settings} from './models/settings';
import {Letter} from './models/letter';
import {EncodingService} from './service/encoding.service';


const TEMPLATE = `
    <div class="letters row text-center">
        <a *ngFor="#letter of letters"
           (click)="onClick(letter)"
           class="letter btn btn-default text-center" [ngClass]="{active: !letter.active}">
           {{ letter.char }}
        </a>
    </div>
`;

@Component({
    selector: 'letters',
    template: TEMPLATE,
})
export class LettersComponent {
    @Input() settings: Settings;
    @Input() letters: Letter[];
    @Input() onSettingsChanged = new EventEmitter();
    @Output() onLetterPressed = new EventEmitter();

    public constructor(private encoderService: EncodingService) {
    }

    public onClick(letter: Letter): void {
        this.encoderService.encodeLetter(letter, this.settings);
    }

    public ngAfterViewInit() {
        this.onSettingsChanged.subscribe((settings) => {
            this.letters.forEach((letter: Letter) => {
                letter.active = letter.id <= settings.level;
            });
        });
    }
}
