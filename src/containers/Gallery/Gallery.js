import React from 'react'
import {Link} from 'react-router-dom'
import '../../style/Gallery.css'

const Gallery = () => {
    return (
        <div className={'gallery-wrapper'}>
            <div className={'gallery-nav'}>
                <Link to={'/'}>Вернуться обратно</Link>
            </div>
            <div className={'gallery-title'}>
                <h2>Галерея картинок, которые подгружаются отдельно</h2>
            </div>
            <div className={'gallery-list'}>
                <div className={'gallery-item'}>
                    <div style={{backgroundImage: `url('/img/img-1.png')`}}/>
                </div>
                <div className={'gallery-item'}>
                    <div style={{backgroundImage: `url('/img/img-2.png')`}}/>
                </div>
                <div className={'gallery-item'}>
                    <div style={{backgroundImage: `url('/img/img-3.png')`}}/>
                </div>
            </div>
        </div>
    )
}

export default Gallery
