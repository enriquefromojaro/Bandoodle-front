import { Injectable, Pipe } from '@angular/core';


@Pipe({
    name: 'filter'
})
@Injectable()
export class Filter {

    transform(value: Object[], filter: string, ...args: any[]): any[];
    transform(value: string[], filter: string, ...args: any[]): string[] {


        if (typeof value === 'string') {
            return value;
        }
        else {
            if (!filter)
                return value;
            if (args.length > 0) {

                var result:any[] = value.filter(
                    elem => args.some(
                        arg=>elem[arg].toString().trim().toLowerCase().indexOf(filter.toString().toLowerCase().trim())>=0
                    )
                );
                return result;
            }
        }

    }
}
