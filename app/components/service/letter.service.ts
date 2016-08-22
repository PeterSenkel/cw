import {Injectable} from 'angular2/core';
import {Letter} from '../models/letter';
import {Settings} from '../models/settings';

@Injectable()
export class LetterService {
    protected letters: Letter[];

    public constructor() {
        this.letters = [
            new Letter ({id: 0, 'char': 'K', 'code': [1,0,1], 'active': false}),
            new Letter ({id: 1, 'char': 'M', 'code': [1,1], 'active': false}),
            new Letter ({id: 2, 'char': 'U', 'code': [0,0,1], 'active': false}),
            new Letter ({id: 3, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 4, 'char': 'E', 'code': [0], 'active': false}),
            new Letter ({id: 5, 'char': 'S', 'code': [0,0,0], 'active': false}),
            new Letter ({id: 6, 'char': 'N', 'code': [1,0], 'active': false}),
            new Letter ({id: 7, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 8, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 9, 'char': 'T', 'code': [1], 'active': false}),
            new Letter ({id: 10, 'char': 'L', 'code': [0,1,0,0], 'active': false}),
            new Letter ({id: 11, 'char': 'W', 'code': [0,1,1], 'active': false}),
            new Letter ({id: 12, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 13, 'char': '.', 'code': [0,1,0,1,0,1], 'active': false}),
            new Letter ({id: 14, 'char': 'J', 'code': [0,1,1,1], 'active': false}),
            new Letter ({id: 15, 'char': 'Z', 'code': [1,1,0,0], 'active': false}),
            new Letter ({id: 16, 'char': '=', 'code': [1,0,0,0,1], 'active': false}),
            new Letter ({id: 17, 'char': 'F', 'code': [0,0,1,0], 'active': false}),
            new Letter ({id: 18, 'char': 'O', 'code': [1,1,1], 'active': false}),
            new Letter ({id: 19, 'char': 'Y', 'code': [1,0,1,1], 'active': false}),
            new Letter ({id: 20, 'char': ',', 'code': [1,1,0,0,1,1], 'active': false}),
            new Letter ({id: 21, 'char': 'V', 'code': [0,0,0,1], 'active': false}),
            new Letter ({id: 22, 'char': 'G', 'code': [1,1,0], 'active': false}),
            new Letter ({id: 23, 'char': '5', 'code': [0,0,0,0,0], 'active': false}),
            new Letter ({id: 24, 'char': '/', 'code': [1,0,0,1,0], 'active': false}),
            new Letter ({id: 25, 'char': 'Q', 'code': [1,1,0,1], 'active': false}),
            new Letter ({id: 26, 'char': '9', 'code': [1,1,1,1,0], 'active': false}),
            new Letter ({id: 27, 'char': '2', 'code': [0,0,1,1,1], 'active': false}),
            new Letter ({id: 28, 'char': 'H', 'code': [0,0,0,0], 'active': false}),
            new Letter ({id: 29, 'char': '3', 'code': [0,0,0,1,1], 'active': false}),
            new Letter ({id: 30, 'char': '8', 'code': [1,1,1,0,0], 'active': false}),
            new Letter ({id: 31, 'char': 'B', 'code': [1,0,0,0], 'active': false}),
            new Letter ({id: 32, 'char': '?', 'code': [0,0,1,1,0,0], 'active': false}),
            new Letter ({id: 33, 'char': '4', 'code': [0,0,0,0,1], 'active': false}),
            new Letter ({id: 34, 'char': '7', 'code': [1,1,0,0,0], 'active': false}),
            new Letter ({id: 35, 'char': 'C', 'code': [1,0,1,0], 'active': false}),
            new Letter ({id: 36, 'char': '1', 'code': [0,1,1,1,1], 'active': false}),
            new Letter ({id: 37, 'char': 'D', 'code': [1,0,0], 'active': false}),
            new Letter ({id: 38, 'char': '6', 'code': [1,0,0,0,0], 'active': false}),
            new Letter ({id: 39, 'char': '0', 'code': [1,1,1,1,1], 'active': false}),
            new Letter ({id: 40, 'char': 'X', 'code': [1,0,0,1], 'active': false}),
            new Letter ({id: 41, 'char': 'BT', 'code': [1,0,0,0,1], 'active': false}),
            new Letter ({id: 42, 'char': 'SK', 'code': [0,0,0,1,0,1], 'active': false}),
            new Letter ({id: 43, 'char': 'AR', 'code': [0,1,0,1,0], 'active': false})
        ];
    }

    public getLetters(): Array<Letter> {
        return this.letters;
    }

    public getRandomLetters(settings: Settings): Letter[] {
        let letterSelection = [];
        let duration = 0;
        let maxDuration = settings.duration * 1000;

        while (duration < maxDuration) {
            let randomLetterId = Math.floor(Math.random() * (settings.level + 1));
            let randomLetter = this.letters[randomLetterId];
            letterSelection.push(randomLetter);
            duration += this.getLetterDuration(randomLetter.code, settings, letterSelection.length);
        }

        return letterSelection;
    }

    private getLetterDuration(code: number[], settings: Settings, letterCount): number {
        let duration = 0;

        for(let i = 0; i < code.length; i++) {
            duration += (code[i]) ? settings.dashLength : settings.dotLength;
            duration += (i < code.length - 1) ? settings.dotLength : 0;
        }

        duration += (letterCount % 5 === 0) ? settings.wordPauseLength : settings.letterPauseLength;

        return duration;
    }

    /**
     * this is just for testing
     *
     * @returns {Letter[]}
     */
    private getParis10Wpm() {
        return [
            new Letter ({id: 6, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 5, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 2, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 10, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 3, 'char': 'S', 'code': [0,0,0], 'active': false}),

            new Letter ({id: 6, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 5, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 2, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 10, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 3, 'char': 'S', 'code': [0,0,0], 'active': false}),

            new Letter ({id: 6, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 5, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 2, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 10, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 3, 'char': 'S', 'code': [0,0,0], 'active': false}),

            new Letter ({id: 6, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 5, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 2, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 10, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 3, 'char': 'S', 'code': [0,0,0], 'active': false}),

            new Letter ({id: 6, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 5, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 2, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 10, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 3, 'char': 'S', 'code': [0,0,0], 'active': false}),

            new Letter ({id: 6, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 5, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 2, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 10, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 3, 'char': 'S', 'code': [0,0,0], 'active': false}),

            new Letter ({id: 6, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 5, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 2, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 10, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 3, 'char': 'S', 'code': [0,0,0], 'active': false}),

            new Letter ({id: 6, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 5, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 2, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 10, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 3, 'char': 'S', 'code': [0,0,0], 'active': false}),

            new Letter ({id: 6, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 5, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 2, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 10, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 3, 'char': 'S', 'code': [0,0,0], 'active': false}),

            new Letter ({id: 6, 'char': 'P', 'code': [0,1,1,0], 'active': false}),
            new Letter ({id: 5, 'char': 'A', 'code': [0,1], 'active': false}),
            new Letter ({id: 2, 'char': 'R', 'code': [0,1,0], 'active': false}),
            new Letter ({id: 10, 'char': 'I', 'code': [0,0], 'active': false}),
            new Letter ({id: 3, 'char': 'S', 'code': [0,0,0], 'active': false}),
        ];
    }
}
