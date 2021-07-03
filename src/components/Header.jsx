import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { IoAddSharp } from 'react-icons/io5';

export const Header = ({toggleSideMenu, searchTodo, resetSearchInput, toggleAddTaskInput}) => {
    return (
        <header>
            <nav>
                <div className="left">
                    <GiHamburgerMenu style={{zIndex: 3}} onClick={toggleSideMenu} className='hamburger svg-btns'/>
                    <AiOutlineHome className='home-btn svg-btns'/>
                </div>
                <div className="right">
                    <div className="search-input-container">
                        <BiSearch className='svg-btns'/>
                        <input onInput={e=>searchTodo(e)} type="text" className="search_input" placeholder='Search' /> 
                        <AiOutlineClose className='svg-btns closebtn' onClick={e=>resetSearchInput(e)}/>
                    </div>
                    <IoAddSharp className='svg-btns add-task' onClick={toggleAddTaskInput}/>
                </div>
            </nav>
        </header>
    )
}
