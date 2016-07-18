import {TestDataDto} from '../dto/test-data.dto';

export class TestData {
    public id: number;
    public prop1: string;
    public prop2: string;

    public constructor(dto: TestDataDto) {
        this.id = dto.id;
        this.prop1 = dto.prop1;
        this.prop2 = dto.prop2;
    }
}
