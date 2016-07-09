import {Injectable} from 'angular2/core';
import { Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Musician} from '../models/Musician';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class MusicianService {
    private base_url = 'http://localhost:8000/api/users/';
    private login_url = 'http://localhost:8000/login/';
    private _common_headers: RequestOptions = new RequestOptions({
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    });
    constructor(private http: Http) {
    }

    public getAllMusicians(): Promise<Musician[]> {
        return this.http.get(this.base_url, this._common_headers).toPromise().then(this.extractData).catch(this.handleError);
    }

    public getMusician(id: number): Promise<Musician> {
        return this.http.get(this.base_url + id.toString() + '/', this._common_headers).toPromise().then(
            user => {
                return new Musician(user.json())
            }
        ).catch(this.handleError);
    }

    private extractData(res: Response): Musician[] {
        let musicians = res.json();
        for (let key in musicians) {
            musicians[key] = new Musician(musicians[key]);
        }
        return musicians;
    }

    public login(username: string, password: string): Promise<{ user: Musician, token: string }> {
        var self = this;
        return this.http.post(this.login_url, JSON.stringify({ username: username, password: password }), this._common_headers)
            .toPromise().then(function(data) {
                let parsed_data = data.json();
                var mus: Musician = new Musician(parsed_data.user);
                var token: string = parsed_data.Token;
                self.setAuthToken(token);
                return { user: mus, token: token };
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

    public setAuthToken(token: string): void {
        this._common_headers.headers.set('Authorization', 'Token ' + token)
    }

}
