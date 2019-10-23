// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApiUrl: 'http://localhost:9090/',
  firebaseConfig: {
    apiKey: "AIzaSyATN1E5iO2vKdvwYUBp9_V3fgKhYBfzi4s",
    authDomain: "mcit-final-project.firebaseapp.com",
    databaseURL: "https://mcit-final-project.firebaseio.com",
    projectId: "mcit-final-project",
    storageBucket: "mcit-final-project.appspot.com",
    messagingSenderId: "728315780100",
    appId: "1:728315780100:web:7a4217b5514c4e1fb12951",
    measurementId: "G-QLD630RV58"
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
