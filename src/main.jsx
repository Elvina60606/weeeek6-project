import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createRoot } from 'react-dom/client'

import { createHashRouter, RouterProvider } from 'react-router'
import routes from './routes/index'

const router = createHashRouter(routes);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
