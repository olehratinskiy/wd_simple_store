import React from 'react';
import facebookIcon from './images/facebook-icon.png';
import instagramIcon from './images/instagram-icon.png';
import telegramIcon from './images/telegram-icon.png';

function Footer() {
    return (
        <footer>
            <div className='footer-full'>
                <div className='footer-inner'>
                <span className='footer-images'>
                    <img src={facebookIcon} className='footer-img' alt='facebook-icon'/>
                    <img src={instagramIcon} className='footer-img' alt='facebook-icon'/>
                    <img src={telegramIcon} className='footer-img' id='telegram-img' alt='facebook-icon'/>
                </span>
                    <p className='footer-text'>You can reach us here</p>
                    <p className='footer-text'>Copyright @2022 | All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
