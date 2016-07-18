import {Component} from 'angular2/core';
import {TestService} from './service/test.service';
import {TestData} from './models/test-data.model';

const TEMPLATE = `
<div *ngIf="data" class="row">
    <h1>there you go</h1>
    <div *ngFor="#d of data" class="col-xs-12">
        <ul>
            <li>{{ d.id }}</li>
            <li>{{ d.prop1 }}</li>
            <li>{{ d.prop2 }}</li>
        </ul>
    </div>
</div>
`;

@Component({
    selector: 'main',
    providers: [TestService],
    template: TEMPLATE,
})
export class AppComponent {
    public data: TestData[] = [];

    public constructor(private testService: TestService) {
    }

    public ngOnInit() {
        this.testService.getTestData()
            .subscribe(data => this.data = data);
    }
}
