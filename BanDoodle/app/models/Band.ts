import {Musician} from "./Musician";
import {Event} from './Event';
import {BACKEND_ROOT} from '../config';
export class Band {
    public avatar: string;
    private _id: number;
    public name: string;
    public genre: string;
    public users: Musician[] | number[];
    public events: Event[] | number[];
    public constructor(data?: any) {
        if (data) {
            if (data.id)
                this._id = data.id;
            this.name = data.name;
            this.genre = data.genre;
            this.users = data.users;
            this.events = data.events;
            this.avatar = data.avatar;
            if (!this.avatar.startsWith('http')) {
                this.avatar = BACKEND_ROOT + this.avatar;
            }
        }
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }
}
