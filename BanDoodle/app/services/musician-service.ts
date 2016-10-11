import {Observable} from "../../node_modules/rxjs/Observable";
import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions} from "@angular/http";
import {Musician} from "../models/Musician";
import {BACKEND_ROOT} from "../config";
import "rxjs/add/operator/toPromise";
@Injectable()
export class MusicianService {
    private base_url = `${BACKEND_ROOT}/api/users/`;
    private login_url = `${BACKEND_ROOT}/login/`;
    private _common_headers: RequestOptions = new RequestOptions({
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        })
    });
    constructor(private http: Http) {
    }

    public getAllMusicians(): Promise<Musician[]> {
        return this.http.get(this.base_url, this._common_headers).toPromise().then(this.extractData).catch(this.handleError);
    }

    public getMusician(id: number): Promise<Musician> {
        return this.http.get(this.base_url + id.toString() + "/", this._common_headers).toPromise().then(
            user => {
                return new Musician(user.json())
            }
        ).catch(this.handleError);
    }

    private extractData(res: Response): Musician[] {
        let musicians = res.json();
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

    public registerUser(user: Musician, avatarFile: File, password:string): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData();
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            formData.append("username", user.username);
            formData.append("email", user.email);
            formData.append("first_name", user.first_name);
            formData.append("last_name", user.last_name);
            formData.append("password", password);
            formData.append("avatar", avatarFile);
            console.log(formData);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                      alert(xhr.response)
                        observer.error(xhr.response);
                    }
                }
            };


            xhr.open("POST", this.base_url, true);
            xhr.send(formData);
        });
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We"d also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }

    public setAuthToken(token: string): void {
        this._common_headers.headers.set("Authorization", "Token " + token)
    }

    public rememberPass(username:string):Promise<any>{
        return this.http.get(`${BACKEND_ROOT}/password-remember/${username}/`).toPromise().then(
            res=> res.json().detail,
            err => err.detail || err
        ).catch(
            err => console.error(err)
        );
    }

}
