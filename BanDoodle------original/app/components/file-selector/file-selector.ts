import {NavController, ActionSheetController} from "ionic-angular";
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Camera, } from 'ionic-native';


@Component({
    selector: 'file-selector',
    templateUrl: 'build/components/file-selector/file-selector.html'
})
export class FileSelector {
    @Input() file: File;
    uri: string;
    @Output() fileChangeEmitter: EventEmitter<File> = new EventEmitter<File>()
    constructor(private nav: NavController, private actSheetCtrl: ActionSheetController) {

    }

    public selectImage() {
        var self = this;
        // ------------------------------- Picking Image with ImagePicker  --------------------------------
        //
        // ImagePicker.getPictures({ maximumImagesCount: 1, quality: 75 }).then(
        //     (results) => {
        //
        //         var avatar: File = new File([], results[0]);
        //
        //         alert(typeof avatar);
        //         self.avatar = avatar;
        //
        //     },
        //     (err) => alert('Imagen ERR: ' + err)
        // ).catch((err?) => alert('Imagen ERROR: ' + err));
        //
        // -------------------------------------------------------------------------------------------------
        var imageSource: number = -1;
        let actionSheet = this.actSheetCtrl.create({
            title: 'Conseguir el avatar de...',
            buttons: [
                {
                    text: 'Cámara',
                    icon: 'camera',
                    handler: () => imageSource = Camera.PictureSourceType.CAMERA
                }, {
                    text: 'Galería',
                    icon: 'images',
                    handler: () => imageSource = Camera.PictureSourceType.PHOTOLIBRARY
                }, {
                    text: 'Cancel',
                    role: 'cancel',

                    handler: () => { }
                }
            ]
        });
        actionSheet.present();

        actionSheet.onDidDismiss(() => {
            if (imageSource >= 0) {

                let options;
                if (imageSource === Camera.PictureSourceType.PHOTOLIBRARY) {
                    options = {
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        destinationType: Camera.DestinationType.DATA_URL
                    }
                }

                if (imageSource === Camera.PictureSourceType.CAMERA)
                    options = {
                        sourceType: Camera.PictureSourceType.CAMERA,
                        cameraDirection: Camera.Direction.FRONT,
                        encodingType: Camera.EncodingType.PNG,
                        destinationType: Camera.DestinationType.DATA_URL
                    }
                Camera.getPicture(options).then(imageData => {
                    alert('Loaded!!!');
                    this.file = new File([this.loadFile(imageData)], 'avatar.png');
                    this.fileChangeEmitter.emit(this.file);
                }, (err?) => alert(err));
            }
        });
    }

    loadFile(uri: string) {
        this.uri = uri;
        var blob: Blob = this.dataURItoBlob("data:image/jpeg;base64," + uri);
        return blob;
    }

    private dataURItoBlob(dataURI: string) {
        // convert base64/URLEncoded data component to raw binary data held in a string


        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        var bb = new Blob([ab], { "type": mimeString });
        return bb;

    }

    onFileChange(event) {
        console.log('onChange');
        this.file = event.srcElement.files[0];
        console.log(this.file);
        this.fileChangeEmitter.next(this.file);
    }
}
