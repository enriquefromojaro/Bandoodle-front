import {FileSelector} from "../../components/file-selector/file-selector";
import {Musician} from "../../models/Musician";
import {MusicianService} from '../../services/musician-service';
import {Camera} from 'ionic-native';
import {Component} from '@angular/core';


@Component({
    templateUrl: 'build/pages/register/register.html',
    providers: [MusicianService],
    directives: [FileSelector]
})
export class RegisterPage {
    user: Musician;
    avatar: File;
    password: string;
    constructor(private musician_service: MusicianService) {
        this.user = new Musician();
        this.avatar = null;
    }

    submit() {
        this.musician_service.registerUser(this.user, this.avatar, this.password).subscribe(
            data => alert('Register successful!!'),
            (err?) => alert + ('ERROR:' + err)
        );
    }
}
