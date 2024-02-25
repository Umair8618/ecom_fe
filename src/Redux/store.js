import { createStore } from "redux";
import rootReducer from "./reducers";

import { persistReducer, persistStore } from "redux-persist";
import localStorage from 'redux-persist/es/storage';


const persistConfig = {
    key: "root",
    storage: localStorage,
    whitelist: ["cart", "product",], // Specify the reducers to be persisted
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = createStore(
    persistedReducer,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const persistor = persistStore(store);
  
  export { store, persistor };
  

// const store = createStore(rootReducer);
// 
// export default store;
