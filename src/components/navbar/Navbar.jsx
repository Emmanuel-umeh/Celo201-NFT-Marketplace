import React,{ useState} from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import {  Link } from "react-router-dom";
import {useContractKit} from "@celo-tools/use-contractkit";
import {truncateAddress} from "../../utils/helpers";

const Menu = () => (
  <>
     <Link to="/"><p>Explore</p> </Link>
      <Link to="/profile">  <p>My NFTs</p></Link>

  </>
 )

 const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false)

     const {address, destroy, connect} = useContractKit();

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/">
            <h1>MegaKitties</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          <input type="text" placeholder='Search NFT Here' autoFocus={true} />
         <Menu />
         {address && <Link to="/"><p onClick={destroy}>Logout</p></Link> }

        </div>
      </div>
      <div className="navbar-sign">
      {!address ? (
        <>

        <button type='button' className='secondary-btn' onClick={connect}>Connect</button>
        </>
      ): (
        <>

          <button type='button' onClick={destroy} className='secondary-btn'>{truncateAddress(address)}</button>


             <Link to="/create">
              <button type='button' className='primary-btn' >Mint NFT</button>
            </Link>
        </>
      )}



      </div>
      <div className="navbar-menu">
        {toggleMenu ?
        <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} />
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links">
             <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
            {address ? (
              <>

              <button type='button' className='secondary-btn'>{truncateAddress(address)}</button>

              <Link to="/create">
                <button type='button' className='primary-btn' >Mint NFT</button>
              </Link>

              </>
            ): (
              <>

                <button type='button' className='secondary-btn'>Connect Wallet</button>

              </>
            )}

            </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
