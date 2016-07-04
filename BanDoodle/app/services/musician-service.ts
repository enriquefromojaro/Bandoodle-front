import {Injectable} from 'angular2/core';
import { Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Musician} from '../models/Musician';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class MusicianService {
    private base_url = 'http://localhost:8000/api/users/';
    private login_url = 'http://localhost:8000/login/';
    private _common_headers:RequestOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        })
    });
    constructor(private http: Http) {
    }

    public getAllMusicians(): Promise<Musician[]> {
        return this.http.get(this.base_url, this._common_headers).toPromise().then(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response): Musician[] {
        let musicians = res.json();
        for (let key in musicians) {
            musicians[key] = new Musician(musicians[key]);
        }
        return musicians;
    }

    public login(username: string, password: string): Promise<Musician> {
        return this.http.post(this.login_url, JSON.stringify({ username: username, password: password }), this._common_headers)
            .toPromise().then(function(data) {
                var mus: Musician = new Musician(data.json().user);
                return mus;
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }

}
