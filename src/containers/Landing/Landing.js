import React from 'react'
import {Link} from 'react-router-dom'
import '../../style/Landing.css'

const Landing = () => {
    return (
        <div className={'landing-wrapper'}>
            <div className={'landing-title'}>
                <h1>Вебпак похождения</h1>
            </div>
            <div className={'landing-description'}>
                <h2>Стартовая станица, когда имеет ссылку на галерею</h2>
            </div>
            <div className={'landing-nav'}>
                <Link to={'/gallery'}>Галерея</Link>
            </div>
        </div>
    )
}

export default Landing
