// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //API_URL: 'http://localhost:4200',
  firebaseConfig: {
    apiKey: "AIzaSyC8APHncZo4PHW4WMbL4lyGYg3n-rhhlco",
    authDomain: "ccpyeu.firebaseapp.com",
    databaseURL: "https://ccpyeu.firebaseio.com",
    projectId: "ccpyeu",
    storageBucket: "ccpyeu.appspot.com",
    messagingSenderId: "372293293775",
    appId: "1:372293293775:web:da258bb139b6c6903709ba"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
