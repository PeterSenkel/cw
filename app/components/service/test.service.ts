import {Injectable} from 'angular2/core';
import {TestData} from '../models/test-data.model';
import {TestDataDto} from '../dto/test-data.dto';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class TestService {
    public fakeData: TestData[];

    public constructor() {
        this.fakeData = [];

        const data1 = new TestDataDto;
        data1.id = 1;
        data1.prop1 = 'property #1';
        data1.prop2 = 'property #2';

        const data2 = new TestDataDto;
        data2.id = 2;
        data2.prop1 = 'property #1';
        data2.prop2 = 'property #2';

        this.fakeData.push(new TestData(data1));
        this.fakeData.push(new TestData(data2));
    }
    
    public getTestData(): Observable<TestData[]> {
        return Observable.of(this.fakeData);
    }
}

