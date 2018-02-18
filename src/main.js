import 'babel-polyfill';
import Inferno, { render as infernoRender } from 'inferno';
import createStore from '@samsch/subscribe-store';
import Component from './Component';

const store = createStore({
  text: '',
});

window.store = store;

const update = text => {
  console.log('update text input', text);
  store.updateState({ text });
};

const appRoot = document.getElementById('app-root');

const render = () => {
  infernoRender(<Component text={store.state.text} update={update} />, appRoot);
};

store.subscribe(render);

render();
