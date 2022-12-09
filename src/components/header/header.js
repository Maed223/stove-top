import React from 'react';
import './header.css'
import logo from './StoveTopLogo.png';

export function Header() {

    return (
        <div className="header">
            <h1><img src={logo} width="75" height="75"/> STOVE TOP</h1>
        </div>
    )
}
