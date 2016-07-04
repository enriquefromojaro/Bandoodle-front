export class Musician {
    private _id: number;
    public username: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public bands: Array<any>;

    public constructor(data: any) {
        if (data.id)
            this._id = data.id;
        this.username = data.username;
        this.first_name = data.first_name;
        this.email = data.email;
        this.bands = data.bands;
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }



}
