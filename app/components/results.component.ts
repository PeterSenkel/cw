import {Component} from 'angular2/core';
import {EncodingService} from './service/encoding.service';

const TEMPLATE = `
    <div class='results row' [ngClass]="{ active: active, inactive: !active} ">
        <div class="col-xs-12 text-center">
            <strong>letters written</strong><br />
            click on the mistakes
        </div>
        <div class="col-xs-12 text-center">
            <strong>
                <span [ngClass]="{'critical': (percentage < 90)}" class="percentage">{{ percentage }}%</span> correct
            </strong>
        </div>

        <div class="col-xs-12 text-center">
            <a class="btn btn-default btn-close" (click)="close()">close</a>
        </div>

        <div class="letters col-xs-12 text-center">
            <a *ngFor="#letter of letters"
               (click)="onClick(letter)"
               [ngClass]="{'mistake': letter.mistake}"
               class="letter btn btn-default">
               {{ letter.char }}
            </a>
        </div>

        <div class="col-xs-12 text-center">
            <strong>
                <span [ngClass]="{'critical': (percentage < 90)}" class="percentage">{{ percentage }}%</span> correct
            </strong>
        </div>

        <div class="col-xs-12 text-center">
            <a class="btn btn-default btn-close" (click)="close()">close</a>
        </div>
    </div>
`;

@Component({
    selector: 'results',
    template: TEMPLATE,
})
export class ResultsComponent {
    public active: boolean = false;
    private letters: Array<any>;
    private percentage: string;

    public constructor(private encodingService: EncodingService) {
    }

    public ngOnInit() {
        this.encodingService.sequenceStopped.subscribe((letters) => {
            if (letters.length > 1) {
                this.active = true;
                this.letters = [];
                this.percentage = '100';

                letters.forEach((letter) => {
                    this.letters.push({
                        char: letter.char,
                        mistake: false
                    })
                });
            }
        });
    }

    private onClick(letter): void {
        letter.mistake = !letter.mistake;
        this.calculatePercentage();
    }

    private calculatePercentage() {
        let mistakes = 0;

        for (let letter of this.letters) {
            mistakes += letter.mistake ? 1 : 0;
        }

        this.percentage = (100 - (mistakes / this.letters.length * 100)).toFixed(2);
    }

    public close() {
        this.active = false;

        setTimeout(() => {
            this.percentage = '100.00';
        }, 1000);
    }
}
