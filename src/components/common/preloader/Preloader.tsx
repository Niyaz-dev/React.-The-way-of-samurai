import React from "react";
import styles from './Preloader.module.css'

type PropsType = {
}

let Preloader: React.FC<PropsType> = () => {
    return <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
}

export default Preloader;