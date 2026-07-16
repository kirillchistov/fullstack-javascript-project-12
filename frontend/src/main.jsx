import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import init from './init.jsx';

createRoot(document.getElementById('root')).render(init());
