import {Musician} from "./Musician";
export class TimeOption {
    private _id: number;
    public start_time: Date;
    public end_time: Date;
    public date: Date;
    public voted_by: Musician[];

    constructor(start_time: Date | string, end_time: Date | string, date: Date | string, voted_by: Musician[] | Object[], id?: number) {
        if (typeof date === 'string') {
            this.date = new Date(date);
            this.date.setHours(0, 0, 0, 0);
        }
        else
            this.date = <Date>start_time;
        if (typeof start_time === 'string') {
            this.start_time = this.date;
            let hour = <any[]>start_time.split(':');
            hour.forEach((elem, index) => this[index] = parseInt(elem), hour);
            this.start_time.setHours(hour[0], hour[1], hour[2])
        }
        else
            this.start_time = start_time;

        if (typeof end_time === 'string') {
            this.end_time = this.date;
            let hour = <any[]>end_time.split(':');
            this.end_time.setHours(hour[0], hour[1], hour[2])
        }
        else
            this.end_time = end_time;

        if (voted_by.length > 0 && voted_by[0] instanceof Musician) {
            this.voted_by = <Musician[]>voted_by;
        }
        else {
            this.voted_by = []
            for (var elem of voted_by) {
                this.voted_by.push(new Musician(elem))
            }
        }
        if (id)
            this._id = id;
    }

    public get id() {
        return this._id;
    }


}
