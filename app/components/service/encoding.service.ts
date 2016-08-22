import {EventEmitter} from 'angular2/core';
import {Settings} from '../models/settings';
import {Letter} from '../models/letter';

export class EncodingService {
    public settings: Settings;
    public letters: Letter[];
    public volume: EventEmitter<number> = new EventEmitter();
    public playing: boolean = false;
    public signal: boolean = false;
    public sequenceStopped = new EventEmitter();
    public letterWritten: EventEmitter<number> = new EventEmitter();
    public audioCtx;
    public gainNode: GainNode;
    public osc: OscillatorNode;
    public encodedLetters: Letter[] = [];
    public countDownNumber = 0;

    public encodeLetter(letter: Letter, settings: Settings): void {
        if (!this.volume.observers.length) {
            this.volume.subscribe((volume) => {
                this.gainNode.gain.value = volume;
            });
        }

        this.letters = [letter];
        this.settings = settings;
        this.encode();
    }

    public encodeLetters(letters: Letter[], settings: Settings): void {
        if (!this.volume.observers.length) {
            this.volume.subscribe((volume) => {
                this.gainNode.gain.value = volume;
            });
        }

        this.letters = letters;
        this.settings = settings;
        this.encode();
    }
    
    private encode(): void {
        if (this.playing) {
            this.playing = false;
            return this.volume.emit(0);
        }

        this.encodedLetters = [];

        if (!this.audioCtx) {
            this.audioCtx = new webkitAudioContext() || new AudioContext();
        }

        this.osc = this.audioCtx.createOscillator();
        this.gainNode = this.audioCtx.createGain();

        this.gainNode.gain.value = 0;
        this.osc.frequency.value = this.settings.freq;
        this.osc.type = 'sine';

        this.osc.connect(this.gainNode);
        this.osc.start(this.audioCtx.currentTime);
        this.gainNode.connect(this.audioCtx.destination);

        this.playing = true;
        this.playSounds();
    }

    private playSounds(i = 5): void {
        if (!this.playing) {
            this.countDownNumber = 0;
            return;
        }

        if (this.letters.length === 1) {
            return this.writeWord(this.letters);
        }

        this.countDownNumber = i;

        setTimeout(() => {
            if (i > 1) {
                this.playSounds(i - 1)
            } else {
                this.writeWord(this.letters);
                this.countDownNumber = 0;
            }
        }, 1000);
    }

    private writeWord(letters: Letter[]): void {
        this.writeLetter(0, letters[0]);

        const subscription = this.letterWritten.subscribe((lastLetterIndex) => {
            this.encodedLetters.push(letters[lastLetterIndex]);

            let nextLetterIndex = lastLetterIndex + 1;
            let pauseLength = nextLetterIndex % 5 === 0 ?
                this.settings.wordPauseLength :
                this.settings.letterPauseLength;

            if (nextLetterIndex < letters.length && this.playing) {
                setTimeout(() => {
                    this.writeLetter(nextLetterIndex, letters[nextLetterIndex]);
                }, pauseLength);
            } else {
                subscription.unsubscribe();
                this.sequenceStopped.emit(this.encodedLetters);
                this.playing = false;
            }
        })
    }

    private writeLetter(letterIndex: number, letter: Letter, i = 0): void {
        this.volume.emit(0.5);
        this.signal = true;
        const codeLength = letter.code[i] ? this.settings.dashLength : this.settings.dotLength;

        setTimeout(() => {
            this.volume.emit(0);
            this.signal = false;
            setTimeout(() => {
                if (i < letter.code.length - 1) {
                    this.writeLetter(letterIndex, letter, i + 1);
                } else {
                    this.letterWritten.emit(letterIndex);
                }
            }, this.settings.dotLength);
        }, codeLength);
    }
}
