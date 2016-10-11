import {Injectable} from "@angular/core";
import {Observable} from "../../node_modules/rxjs/Observable";
import {Subject} from "../../node_modules/rxjs/Subject";

@Injectable()
export class GlobalVarsService {
    private global_vars: Map<string,any>;
    private observables: Map<string,Subject<any>>;
    private static singleton: GlobalVarsService;

    public static getInstance ():GlobalVarsService{
      if(!GlobalVarsService.singleton)
        GlobalVarsService.singleton = new GlobalVarsService();
      return GlobalVarsService.singleton;
    }

    constructor (){
      this.global_vars = new Map<string,any>();
      this.observables = new Map<string,Subject<any>>();
    }
    public getVar(var_name: string): any {
        return this.global_vars.get(var_name);
    }

    public getObservableVar(var_name: string): Observable<any> {
        if (!this.observables.has(var_name)) {
            this.observables.set(var_name,new Subject<any>());
            this.observables.get(var_name).next(this.global_vars.get(var_name));
        }
        return this.observables.get(var_name).asObservable();
    }

    public setVar(var_name: string, value: any): void {
        if (var_name === null || var_name.length === 0) {
            throw new ReferenceError("Variable name must not be null, undefined or empty string");
        }

        if (!this.global_vars.has(var_name)) {
            throw new ReferenceError(`Does not exist global variable "${var_name}"`);
        }
        else {
            this.updateObservables(var_name, value);
            this.global_vars.set(var_name, value);
        }
    }

    public addVar(var_name: string, value: any): void {
        if (var_name === null || var_name.length === 0) {
            throw new ReferenceError("Variable name must not be null, undefined or empty string");
        }

        if (this.global_vars.has(var_name)) {
            throw new ReferenceError('Global variable "" + var_name + "" already exists');
        }
        else {
            this.global_vars.set(var_name, value);
        }
    }

    private updateObservables(var_name: string, value: any): void {
        if (this.observables.has(var_name)) {
            this.observables.get(var_name).next(value);
        }
    }

    public clear(){
        this.observables.clear();
        this.global_vars.clear();
    }

}
