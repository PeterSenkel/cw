export class Letter {
    public id: number;
    public char: string;
    public code: Array<number>;
    public active: boolean;

    constructor(data) {
        this.id = data.id;
        this.char = data.char;
        this.code = data.code;
        this.active = data.active;
    }
}
