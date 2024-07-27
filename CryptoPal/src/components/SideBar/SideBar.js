import React from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'

const SideBar = () => {
    return (
        <div className='app-sidebar'>
            <ul className='sidebar-links'>
                <Link
                    to="/explore"
                    className="sidebar-button">
                    Explore
                </Link>
            </ul>
        </div>
    )
}

export default SideBar