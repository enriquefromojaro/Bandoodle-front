import {TimeOption} from "../models/TimeOptions";
import {Injectable, Pipe} from '@angular/core';

@Pipe({
    name: 'atDate'
})
@Injectable()
export class AtDatePipe {

    transform(value: TimeOption[], args: Date) {
        return value.filter(value => { return args.getTime() === value.date.getTime() });
    }
}
