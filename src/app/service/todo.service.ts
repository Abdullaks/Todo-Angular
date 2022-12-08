import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  fireStoreCollection: AngularFirestoreCollection;
  constructor(private firestore: AngularFirestore) {
    this.fireStoreCollection = firestore.collection('todos');
  }

  addTodo(task: string) {
    this.fireStoreCollection.add({
      task: task,
      isDone: false
    });
  }

  updateTodoStatus(id: string, newStatus: boolean) {
    this.fireStoreCollection.doc(id).update({ isDone: newStatus });
  }
  deleteTodo(id: string) {
    this.fireStoreCollection.doc(id).delete();
  }
}
