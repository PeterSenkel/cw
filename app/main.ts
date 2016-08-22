/// <reference path="../typings/main.d.ts" />
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './components/app.component'
import {EncodingService} from './components/service/encoding.service';
import {LetterService} from './components/service/letter.service';

bootstrap(AppComponent, [EncodingService, LetterService]);
