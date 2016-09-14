import {Band} from "./Band";
import {BACKEND_ROOT} from '../config';
export class Musician {
    public avatar: string;
    private _id: number;
    public username: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public bands: Array<Band | number>;

    public constructor(data?: any) {
        if (data) {
            if (data.id)
                this._id = data.id;
            this.username = data.username;
            this.first_name = data.first_name;
            this.email = data.email;

            if (data.bands)
                this.bands = data.bands.map((band) => new Band(band));
            else
                this.bands = [];
                
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
