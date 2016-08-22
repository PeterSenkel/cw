import {Component} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {Input} from 'angular2/core';
import {Output} from 'angular2/core';
import {Letter} from './models/letter';
import {Settings} from './models/settings';

const TEMPLATE = `
    <div class="col-xs-12 text-left">
        <label for="wpm">wpm</label>
        <select name="wpm" [(ngModel)]="settings.wpm">
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
            <option value="32">32</option>
            <option value="33">33</option>
            <option value="34">34</option>
            <option value="35">35</option>
        </select>
        
        <label for="speed">fw</label>
        <select name="speed" [(ngModel)]="settings.speed">
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
            <option value="32">32</option>
            <option value="33">33</option>
            <option value="34">34</option>
            <option value="35">35</option>
        </select>

        <label for="level">level</label>
        <select id="level" [(ngModel)]="settings.level">
            <option *ngFor="#letter of letters; #i=index" value="{{ i }}" selected="selected">{{ i + 1}}</option>
        </select>

        <label for="duration">min</label>
        <select id="duration" [(ngModel)]="settings.duration">
            <option value="15">0.25</option>
            <option value="30">0.5</option>
            <option value="60">1</option>
            <option value="90">1.5</option>
            <option value="120">2</option>
            <option value="180">3</option>
            <option value="240">4</option>
            <option value="300">5</option>
        </select>

        <label for="freq:">freq</label>
        <select id="freq" [(ngModel)]="settings.freq">
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
            <option value="1000">1000</option>
            <option value="1100">1100</option>
            <option value="1200">1200</option>
            <option value="1300">1300</option>
            <option value="1400">1400</option>
            <option value="1500">1500</option>
        </select>
    </div>

    <!--
    <div class="checkboxes col-xs-6 text-right">
        <label for="fShift:">fShift</label>
        <input [(ngModel)]="settings.fShift" class="checkbox" id="fShift" type="checkbox" /><br/>
        <label for="noise:">noise</label>
        <input [(ngModel)]="settings.noise" class="checkbox" id="noise" type="checkbox" />
    </div>
    -->
`;

@Component({
    selector: 'settings',
    template: TEMPLATE,
    host: {
        '(change)': 'change()'
    },
})
export class SettingsComponent {
    @Input() letters: Letter[];
    @Output() public onSettingsChanged = new EventEmitter();

    public settings: Settings;

    public constructor () {
        this.settings = new Settings ({
            wpm: "25",
            speed: "7",
            level: "17",
            duration: "60",
            freq: "600"
        });
    }

    public ngOnInit() {
        this.onSettingsChanged.emit(this.settings);
    }

    public change() {
        this.onSettingsChanged.emit(this.settings);
    }
}
