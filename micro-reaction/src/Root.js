import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouted from './AppRouted';

const Root = () => (
    <BrowserRouter>
        <AppRouted/>
    </BrowserRouter>
);

export default Root;