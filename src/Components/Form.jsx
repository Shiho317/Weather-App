import React, { useState } from 'react'
import HamburgerMenu from './HamburgerMenu';

const Form = (props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(true)

  const IsOpenMenu = () => {
    setIsOpenMenu(prev => !prev)
  };

  const [isOpen, setOpen] = useState(true);

  const IsClose = () => {
    setOpen(false)
  }

  return(
    <div>
      <div className="hamburger-btn" onClick={IsOpenMenu}>
        <HamburgerMenu isOpen={isOpen} setOpen={setOpen}/>
      </div>
      <div className={isOpenMenu ? "form-container" : "form-container hidden"}>
        <form onSubmit={props.getWeather} onClick={props.VideoSource}>
      <div className="location">
        <div className="input">
          <input type="text" className="city" name="city" autoComplete="off" placeholder="city"></input>
        </div>
        <div className="input">
          <input type="text" className="country" name="country" autoComplete="off" placeholder="country"></input>
        </div>
        <div className="input">
          <button className="submit-btn" onClick={() => {IsOpenMenu(); IsClose();}}>Get Weather</button>
        </div>
      </div>
      </form>
      </div>
      <div>{props.error ? error() : ""}</div>
    </div>
  )
};

function error(){
  return(
    <div className="error">Error</div>
  )
};

export default Form;
