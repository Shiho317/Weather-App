import React from 'react';
import { Squeeze as Hamburger } from 'hamburger-react';

export default function HamburgerMenu({isOpen, setOpen}) {
  
  return (
    <div>
      <Hamburger toggled={isOpen} toggle={setOpen} size={20}/>
    </div>
  )
}

