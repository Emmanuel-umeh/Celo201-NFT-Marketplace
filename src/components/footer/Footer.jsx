import React from 'react'
import './footer.css'
import nftlogo from '../../assets/logo.png'
const Footer = () => {
  return (
    <div className='footer section__padding'>
      <div className="footer-links">
        <div className="footer-links_logo">
        <div>
          <img src={nftlogo} alt="logo" />
          <p>MegaKitties</p>
        </div>
   </div>
   </div>
   </div>
  )
}

export default Footer
