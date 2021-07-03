import React from 'react'

export const SideMenu = ({sideMenu}) => {
    sideMenu ? document.body.classList.add('bl') : document.body.classList.remove('bl');
    
    return (
        <nav style={sideMenu ? {display: 'grid'} : {display: 'none'}} className={sideMenu ? 'side_menu open_sidenav' : 'side_menu close_sideNav'}> 
            <button className='links'>Today</button>
            <button className='links'>Yesterday</button>
            <button className='links'>Inbox</button>
        </nav>
    )
}
