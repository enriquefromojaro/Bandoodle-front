import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import {Musician} from '../models/Musician';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class EventService {
    private base_url = 'http://localhost:8000/api/events/';
    private _common_headers: RequestOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    });
    constructor(private http: Http) {
    }

    public getAllEvents(): Promise<any[]> {
        return this.http.get(this.base_url, this._common_headers).toPromise().then(this.extractData).catch(this.handleError);
    }

    public getEvent(id: number): Promise<any> {
        return this.http.get(this.base_url + id + '/', this._common_headers).toPromise().then(
            data => {
                return data.json();
            }
        ).catch(this.handleError);
    }

    private extractData(res: Response): Musician[] {
        let bands = res.json();
        return bands;
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
    public setAuthToken(token: string) {
        this._common_headers.headers.set('Authorization', 'Token ' + token);
    }

}
