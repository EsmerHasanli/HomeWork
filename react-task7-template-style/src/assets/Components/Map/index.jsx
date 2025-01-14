import React from 'react'
import style from './index.module.css'; 

const Map = () => {
  return (
    <section id={style.map}>
        <iframe className={style.map} src="https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=Twitter,+Inc.,+Market+Street,+San+Francisco,+CA&aq=0&oq=twitter&sll=28.659344,-81.187888&sspn=0.128789,0.264187&ie=UTF8&hq=Twitter,+Inc.,+Market+Street,+San+Francisco,+CA&t=m&z=15&iwloc=A&output=embed" frameborder="0"></iframe>

    </section>
  )
}

export default Map