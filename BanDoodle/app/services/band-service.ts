import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Band } from "../models/Band";
import { BACKEND_ROOT } from "../config";
import "rxjs/add/operator/toPromise";
@Injectable()
export class BandService {
    private base_url = `${BACKEND_ROOT}/api/bands/`;
    private _common_headers: RequestOptions = new RequestOptions({
        headers: new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        })
    });
    constructor(private http: Http) {
    }

    public getband(id: number): Promise<any> {
        return this.http.get(this.base_url + id.toString() + "/", this._common_headers).toPromise().then(
            user => {
                return user.json();
            }
        ).catch(this.handleError);
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We"d also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
    public setAuthToken(token: string) {
        this._common_headers.headers.set("Authorization", "Token " + token);
    }

    public createBand(band: Band, avatarFile: File): Promise<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData();
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("name", band.name);
            formData.append("users", band.users);
            formData.append("genre", band.genre);
            formData.append("events", band.events);
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
            xhr.setRequestHeader("Authorization", this._common_headers.headers.get("Authorization"));
            xhr.send(formData);
        }).toPromise();
    }

}
