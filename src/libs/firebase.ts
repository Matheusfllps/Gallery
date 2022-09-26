import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: 'AIzaSyC3jURNTcGBPmzlDNdc7qYOYufE54xE4cU',
  authDomain: 'd5reactgallery-8afdf.firebaseapp.com',
  projectId: 'd5reactgallery-8afdf',
  storageBucket: 'd5reactgallery-8afdf.appspot.com',
  messagingSenderId: '213289871702',
  appId: '1:213289871702:web:fcd11e3e0152f87051cef7',
};

const firebaseApp = initializeApp(firebaseConfig); //aqui inicializa o banco de dados firebase

export const storage = getStorage(firebaseApp); // pega só o que queremos usar  do banco que é o storage onde armazena arquivos
