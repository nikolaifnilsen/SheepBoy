import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDeLGsNSK68Z4kdpFCcuqMQ7r0Of1vE65k",
  authDomain: "sheepboy-7cea7.firebaseapp.com",
  databaseURL: "https://sheepboy-7cea7.firebaseio.com",
  projectId: "sheepboy-7cea7",
  storageBucket: "sheepboy-7cea7.appspot.com",
  messagingSenderId: "928717185131",
  appId: "1:928717185131:web:36f6d2e6806cf25067112e",
  measurementId: "G-TPY2BR2S61"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App search="" tags={[]} sort="Newest" publisher="" platform=""/>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
