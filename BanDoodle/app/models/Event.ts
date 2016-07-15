import {TimeOption} from "./TimeOptions";
export class Event {
    private _id: number;
    public name: string;
    public type: string;
    public direction: string;
    public time_options: TimeOption[];

    constructor(name: string, type: string, direction: string, time_options: TimeOption[] | any[], id?: number) {
        if (id) {
            this._id = id;
        }
        this.name = name;
        this.type = type;
        this.direction = direction;
        if (time_options && time_options.length > 0 && time_options instanceof TimeOption) {
            this.time_options = <TimeOption[]>time_options;
        }
        else {
            this.time_options = [];
            for (var elem of time_options) {
                if (elem.id)
                    this.time_options.push(new TimeOption(elem.start_time, elem.end_time, elem.date, elem.voted_by, id = elem.id));
                else
                    this.time_options.push(new TimeOption(elem.start_time, elem.end_time, elem.date, elem.voted_by));
            }
        }
    }

    public get id(){
      return this.id;
    }
}
