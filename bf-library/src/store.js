import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
//import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
// Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

/////// ADD YOUR FIREBASE CONFIG HERE /////////
const firebaseConfig = {
  apiKey: "AIzaSyCoXQrqwALNLktlWO3b4shLTe_Dov5BYzk",
  authDomain: "bf-library.firebaseapp.com",
  databaseURL: "https://bf-library.firebaseio.com",
  projectId: "bf-library",
  storageBucket: "bf-library.appspot.com",
  messagingSenderId: "349162534927",
  appId: "1:349162534927:web:a5d65ab52ec93d26fccb7a",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
//const createStoreWithFirebase = compose(
// reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
//  reduxFirestore(firebase)
//)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer,
});

// Check for settings in localStorage
if (localStorage.getItem("settings") == null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false,
  };

  // Set to localStorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// Create store
const store = createStore(
  rootReducer,
  initialState,
  compose(
    //reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export { store, rrfProps };
