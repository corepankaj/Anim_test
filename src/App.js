import React from 'react';

import Container from './pages/Container';

import './assets/css/index.scss';

import { Provider } from 'react-redux';
import Store from './pages/Store';

const App = ()=> (
	<Provider store={Store}>
		<Container />
	</Provider>
)

export default App;