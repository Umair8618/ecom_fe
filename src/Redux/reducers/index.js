import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    products: productReducer,
  });
  
  export default rootReducer;
