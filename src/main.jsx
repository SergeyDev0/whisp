import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/reset.scss';
import './styles/vars.scss';
import './styles/index.scss';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
		<App />
	</BrowserRouter>
);