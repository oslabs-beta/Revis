import React from 'react';
import styles from '../../styles/StaticPages.module.scss';
import Image from 'next/image';
import Liam from './Fontes_Photo.png'
import Chao from './IMG_0978 (1).PNG'
import Mercedes from './Mercedes.png'
import Jason from './image0.png'
import router from 'next/router';

function AboutUs() {

  function onButtonClick() {
    document.querySelector(`#${styles.theTeam}`).scrollIntoView();
  }

  return (
    <div className={styles.aboutUsWrapper}>
      <button id={styles.backButton} type= 'button' onClick={()=>router.replace('/')}>Back</button>
      <div className={styles.title}>
        {' '}
        <span id={styles.highlight}>By developers, for developers</span>
      </div>
      <h2>Giving back to the community</h2>
      <p>
        Without Open Source Projects, many of the technologies we take for
        granted today would never have developed, or would be locked away behind
        patent law. The open source movement is the reason that technology has
        developed at such a breakneck pace for the past few decades.
      </p>
      <p>
        We created Revis, to contribute to the Open Source Community and for
        developers using Redis to be able to maximize its potential and to make
        more efficient and strategic decisions.
      </p>
      <button id={styles.meetTheTeam} type='button' onClick={onButtonClick}>
        Meet our team
      </button>
      <h1 id={styles.theTeam}>The team</h1>
    <div className={styles.team}>

  
    <span id={styles.images}>
      <Image
        src={Chao}
        alt='Image not available'
        height='200vh'
        width='250vh'
      />
      <p>Chao Yu</p>
      </span>
      <span id={styles.images}>
      <Image
        src={Jason}
        alt='Image not available'
        height='200vh'
        width='250vh'
      />
      <p>Jason Zeng</p>
      </span>
      <span id={styles.images}>
      <Image
        src={Liam}
        alt='Image not available'
        height='200vh'
        width='250vh'
      />
      <p >Liam Fontes</p>
      </span>
      <span id={styles.images}>
      <Image
        src={Mercedes}
        alt='Image not available'
        height='200vh'
        width='250vh'
      />
      <p>Mercedes Kalaizic</p>
      </span>
    </div>
    </div>
  );
}
export default AboutUs;
