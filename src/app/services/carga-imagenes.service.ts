import { Injectable } from '@angular/core';
//Firebase
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CargaImagenesService {
  private CARPETA_IMAGENES = 'img';

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  private guardarImagen(imagen: { nombre: string; url: string }) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    for (const item of imagenes) {
      item.estaSubiendo = true;
      if (item.progreso >= 100) {
        continue;
      }

      const file = item.archivo;
      const filePath = `${this.CARPETA_IMAGENES}/${item.nombreArchivo}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      // con esta función nos suscribimos a los cambios en el progreso
      uploadTask
        .percentageChanges()
        .subscribe((resp) => (item.progreso = resp));
      // obtengo el url de descarga cuando este disponible
      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() =>
            fileRef.getDownloadURL().subscribe((url) => {
              console.log('Imagen cargada con éxito');
              item.url = url;
              item.estaSubiendo = false;
              this.guardarImagen({
                nombre: item.nombreArchivo,
                url: item.url,
              });
            })
          )
        )
        .subscribe();
    }
  }
}
