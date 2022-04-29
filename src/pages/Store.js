import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import RootReducer from './redux/RootReducer';

const middleware = [thunk];
const Store = createStore(
							RootReducer,
							composeWithDevTools(applyMiddleware(...middleware)) 
						);
export default Store;