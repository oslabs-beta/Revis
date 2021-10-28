import React from 'react';
import styles from '../../styles/StaticPages.module.scss';
import router from 'next/router';

function AboutUs() {
  function onButtonClick() {
    document.querySelector(`#${styles.theTeam}`).scrollIntoView();
  }

  return (
    <div className={styles.aboutUsWrapper}>
      <button
        id={styles.backButton}
        type='button'
        onClick={() => router.replace('/')}
      >
        Back
      </button>
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
      <h1 id={styles.theTeam}>Team of contributors</h1>
      <div className={styles.team}>
        <div className={styles.imageDiv}>
          <span id={styles.chao}></span>
          <p>Chao Yu</p>
          <div className={styles.contactIcons}>
            <button
              onClick={() => {
                window.open('https://github.com/mkalaizic');
              }}
              id={styles.linkedin}
            >
              {' '}
            </button>
            <button
              onClick={() => {
                window.open('https://github.com/czyu1');
              }}
              id={styles.github}
            >
              {' '}
            </button>
          </div>
        </div>
        <div className={styles.imageDiv}>
          <span id={styles.jason}></span>
          <p>Jason Zeng</p>
          <div className={styles.contactIcons}>
            <button
              type='button'
              onClick={() => {
                window.open('https://github.com/mkalaizic');
              }}
              id={styles.linkedin}
            >
              {' '}
            </button>
            <button
              type='button'
              onClick={() => {
                window.open('https://github.com/jzeng151');
              }}
              id={styles.github}
            >
              {' '}
            </button>
          </div>
        </div>
        <div className={styles.imageDiv}>
          <span id={styles.liam}></span>

          <p>Liam Fontes</p>
          <div className={styles.contactIcons}>
            <button
              type='button'
              onClick={() => {
                window.open('https://github.com/mkalaizic');
              }}
              id={styles.linkedin}
            >
              {' '}
            </button>
            <button
              type='button'
              onClick={() => {
                window.open('https://github.com/LiamFontes');
              }}
              id={styles.github}
            >
              {' '}
            </button>
          </div>
        </div>
        <div className={styles.imageDiv}>
          <span id={styles.mercedes}></span>
          <p>Mercedes Kalaizic</p>
          <div className={styles.contactIcons}>
            <button
              type='button'
              onClick={() => {
                window.open('https://https://www.linkedin.com/in/mkalaizic/');
              }}
              id={styles.linkedin}
            >
              {' '}
            </button>
            <button
              type='button'
              onClick={() => {
                window.open('https://github.com/mkalaizic');
              }}
              id={styles.github}
            >
              {' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
