import { useState } from 'react';
import styles from './Carousel.module.css';
export default function Carousel(props){
    //destructuring the props
    const {clickedImageIndex,imageList,setCarousel}=props;
    //index of currently shown image
    const [currentImageIndex,setCurrentImageIndex]=useState(clickedImageIndex);
    //close the caousel if close button is clicked
    function handleCarouselClose(){
        setCarousel(null);
    }
    //change image of forward or backward button is clicked accordingly
    function handleImageChange(change){
        setCurrentImageIndex((currentImageIndex+change+imageList.length)%imageList.length);
    }
    return(
        <div className={styles.carouselCon} >
            <img onClick={()=>handleImageChange(-1)} className={styles.backBtn} src='https://cdn-icons-png.flaticon.com/128/3916/3916912.png' />
            <img className={styles.currentImage} src={imageList[currentImageIndex].src} />
            <img onClick={()=>handleImageChange(1)} className={styles.forwBtn} src='https://cdn-icons-png.flaticon.com/128/3916/3916907.png' />
            <img onClick={handleCarouselClose} className={styles.closeBtn} src='https://cdn-icons-png.flaticon.com/128/3917/3917759.png' />
        </div>
    );
}