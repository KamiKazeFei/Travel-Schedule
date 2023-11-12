import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyApXw3YNpRnPIipjLxEfuVSJu3uE7zKYnk",
  authDomain: "travel-schedule-31ad9.firebaseapp.com",
  projectId: "travel-schedule-31ad9",
  storageBucket: "travel-schedule-31ad9.appspot.com",
  messagingSenderId: "673631685585",
  appId: "1:673631685585:web:59b974d6744a1a23cb2ef0",
  measurementId: "G-K7TL5T58FS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
