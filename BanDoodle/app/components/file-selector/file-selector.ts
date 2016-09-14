import {NavController, ActionSheetController} from "ionic-angular";
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Camera} from 'ionic-native';

function dataURItoBlob(data: string, type:string) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString = atob(data);
    var sliceSize = 512;
    var byteArrays = [];

    for (var offset = 0; offset < byteString.length; offset += sliceSize) {
    var slice = byteString.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

    var bb = new Blob(byteArrays, { type:type });
    return bb;

}

@Component({
    selector: 'file-selector',
    templateUrl: 'build/components/file-selector/file-selector.html'
})
export class FileSelector {
    @Input() file: File;
    uri: string = '';
    @Output() fileChangeEmitter: EventEmitter<File> = new EventEmitter<File>()
    constructor(private nav: NavController, private actSheetCtrl: ActionSheetController) {
    }

    public selectImage() {

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
                        destinationType: Camera.DestinationType.DATA_URL,
                        encodingType: Camera.EncodingType.JPEG,
                        alowEdit: true,
                        saveToPhotoAlbum: true,
                        targetWidth: 100
                    }
                }

                if (imageSource === Camera.PictureSourceType.CAMERA)
                    options = {
                        sourceType: Camera.PictureSourceType.CAMERA,
                        cameraDirection: Camera.Direction.FRONT,
                        encodingType: Camera.EncodingType.JPEG,
                        destinationType: Camera.DestinationType.DATA_URL,
                        alowEdit: true,
                        saveToPhotoAlbum: true,
                        targetWidth: 100

                    }
                Camera.getPicture(options).then(data => {
                    this.uri = "data:image/jpeg;base64," + data;
                    this.file = new File([this.loadFile(data)], 'avatar.jpg', {
                        type : 'image/jpeg'
                    });
                    this.fileChangeEmitter.emit(this.file);
                }, (err?) => console.error(err));
            }
        });
    }

    loadFile(uri: string):Blob {
        return dataURItoBlob(uri, 'image/jpeg');
    }

    onFileChange(event) {
        this.file = event.srcElement.files[0];
        this.fileChangeEmitter.next(this.file);
    }
}
