const config = {
    apiKey: "AIzaSyD_Utt2UBIZG0NGPoJ7DNj-qpoAAeFZkyg",
    authDomain: "phfb-7aa87.firebaseapp.com",
    projectId: "phfb-7aa87",
    storageBucket: "phfb-7aa87.appspot.com",
    messagingSenderId: "343197799754",
    appId: "1:343197799754:web:db725c5eb86777774f1db3",
    measurementId: "G-TWZYRYW8C4",
};
export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
    } else {
      return config;
    }
  }    