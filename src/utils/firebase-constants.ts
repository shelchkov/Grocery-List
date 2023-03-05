export const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${process.env.REACT_APP_APP_NAME}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_APP_NAME}.firebaseio.com`,
  projectId: process.env.REACT_APP_APP_NAME,
  storageBucket: `${process.env.REACT_APP_APP_NAME}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}
