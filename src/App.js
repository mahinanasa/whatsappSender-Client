// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { createStore, applyMiddleware, compose }from 'redux';
import { Provider }from 'react-redux'
import rootReducers from './redux/_reducers'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers,  composeEnhancers(applyMiddleware(...middlewares)));

export default function App() {
  return (
    <Provider store={store}>
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
    </Provider>
  );
}
