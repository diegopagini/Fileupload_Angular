import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item {
  name: string;
  url: string;
}

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css'],
})
export class FotosComponent implements OnInit {
  items: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.items = firestore.collection('item').valueChanges();
  }

  ngOnInit(): void {}
}
