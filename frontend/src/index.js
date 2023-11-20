import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter} from "react-router-dom"
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-

root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
    );

