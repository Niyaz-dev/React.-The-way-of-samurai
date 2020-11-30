import React from "react";
import styles from './Preloader.module.css'

let Preloader = () => {
    return <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
}

export default Preloader;