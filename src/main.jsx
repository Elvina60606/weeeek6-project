import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createRoot } from 'react-dom/client'

import { createHashRouter, RouterProvider } from 'react-router'
import routes from './routes/index'
const router = createHashRouter(routes);

import { store } from './store';
import { Provider } from 'react-redux';
import MessageToast from './component/messageToast';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <MessageToast />
    <RouterProvider router={router}/>
  </Provider>
)
