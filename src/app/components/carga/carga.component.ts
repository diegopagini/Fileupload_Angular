import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { FileItem } from '../../models/file-item';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css'],
})
export class CargaComponent implements OnInit {
  archivos: FileItem[] = [];
  estaSobreElemento: boolean = false;

  constructor(public _cargaImagenes: CargaImagenesService) {}

  ngOnInit(): void {}

  cargarImagenes() {
    this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }
}
