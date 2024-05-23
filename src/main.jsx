import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { NotificationProvider } from './providers/NotificationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <NotificationProvider >
            <App />
            <ToastContainer />
        </NotificationProvider>
    </React.StrictMode>,
);
