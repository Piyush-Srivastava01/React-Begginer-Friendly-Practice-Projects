import { useEffect, useState } from "react"
import ImageForm from "../ImageForm/ImageForm";
import Carousel from "../Carousel/Carousel";
import Button from "../Button/Buttton";
import Spinner from 'react-spinner-material';
import {toast} from 'react-toastify';
import { collection, onSnapshot,doc, addDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import db from "../../config/firebaseInit";
import styles from './ImageList.module.css';
export default function ImageList(props){
    //albumRef is a refrence for currently opened album
    const albumRef=doc(db,'albums',props.album.id);
    //decides if to show the form or not
    const [showImageForm,setImageForm]=useState(false);
    //decides if to show the carousel or not
    const [showCarousel, setCarousel]=useState(null);
    // store the list of images
    const [images,setImages]=useState([]);
    // indicates if edit button is clicked for a image
    const [editImage,setEditImage]=useState(null);
    //decides when to show the loading spinner
    const [showSpinner,setSpinner]=useState(true);
    // sets a event handler for listening real time changes
    useEffect(()=>{
        //custome query to get data in ordered manner
        const q=query(collection(albumRef,'images'),orderBy('createdOn','desc'))
        const unsub=onSnapshot(q,(fetchedImages)=>{
            const newImages=[];
            fetchedImages.forEach((image)=>{
                newImages.push({id:image.id,...image.data()});
            })
            setImages(newImages);
            //hide the loading spinner after fetching the data
            setSpinner(false);
        })
        return unsub;
    },[])
    // adds image to database
    async function handleAdd(albumRef,image){
        await addDoc(collection(albumRef,'images'),image);
    }
    //deletes image from the database
    async function handleDelete(imageRef){
        try {
            await deleteDoc(imageRef);
            toast.success("Image deleted successfully.", {
                position: toast.POSITION.TOP_CENTER
              });
        } catch (error) {
            toast.error("Somethin went wrong !", {
                position: toast.POSITION.TOP_LEFT
              });
        }
    }
    //updates the image in the database
    async function handleUpdate(imageRef,updatedImage){
        await updateDoc(imageRef,updatedImage);
    }
    // handles the image form submit event
    async function imageFormSubmit(newImage){
        // if form is currently being used for editing a image
        if(editImage){
            //reference of the imge to be edited
            const imageRef=doc(albumRef,'images',editImage.id);
            try {
                await handleUpdate(imageRef,newImage);
                toast.success("Image updated successfully.", {
                    position: toast.POSITION.TOP_CENTER
                  });
            } catch (error) {
                toast.error("Somethin went wrong !", {
                    position: toast.POSITION.TOP_LEFT
                  });
            }
        }
        else{
            // if the form is being used for adding a new image
            try {
                await handleAdd(albumRef,newImage);
                toast.success("Image added successfully.", {
                    position: toast.POSITION.TOP_CENTER
                  });
            } catch (error) {
                toast.error("Somethin went wrong !", {
                    position: toast.POSITION.TOP_LEFT
                  });
            }
        }
    }
    return (
        <>
        {/*passing props on the basis if its being used for editing or adding image*/}
        {showImageForm&&<ImageForm heading={editImage?`Update ${editImage.title}`:`Add image to ${props.album.title}`} editImage={editImage} onSubmitHandler={imageFormSubmit} />}
        <div className={styles.albumHeader} >
            <div className={styles.backAndHeadingCon} >
                <img className={styles.backBtn} src="https://cdn-icons-png.flaticon.com/128/318/318276.png" onClick={()=>props.setAlbum(null)} />
                <h2 >Images in {props.album.title}</h2>
            </div>
            <div className={styles.formBtn} >
                {/*toggle if to show the form */}
                <Button bg={showImageForm?'red':'blue'} onClick={()=>{
                    //close the form if open and vice versa
                    setImageForm(!showImageForm);
                    // clear the editing data from local state if its set
                    setEditImage(null);
                }} >{showImageForm?'Cancel':'Add Image'}</Button>
            </div>
        </div>
        <div className={styles.imagesCon} >
            {/*spinner to show loading status of the component */}
            <Spinner radius={150} color={"#87C"} stroke={5} visible={showSpinner} className={styles.spinner} />
            {/*show the status of album if its empty*/}
            {images.length===0&&<h2>No images found in the album</h2>}
            {images.map((image,ind)=>(
                <div className={styles.imageCon} key={ind} onClick={()=>setCarousel(ind)} >
                    {/*set the ind of clicked image to show carousel */}
                    <img className={styles.image} src={image.src} />
                    <div className={styles.titleCon} >
                        <b className={styles.imageTitle} >{image.title}</b>
                    </div>
                    {/*a div for show semi transparent black cover during hovering of image*/}
                    <div className={styles.hoverEffect} >
                        {/*button to edit image*/}
                        <img src="https://cdn.icon-icons.com/icons2/916/PNG/512/Edit_icon-icons.com_71853.png" 
                        onClick={(e)=>{
                            e.stopPropagation();
                            setEditImage({
                                id:image.id,
                                title:image.title,
                                url:image.src
                            })
                            setImageForm(true);
                            }} />
                        {/*button to delete image*/}    
                        <img src="https://www.pngplay.com/wp-content/uploads/7/Delete-Icon-Transparent-PNG.png"
                        onClick={(e)=>{
                            e.stopPropagation();
                            handleDelete(doc(albumRef,'images',image.id))}}
                        />
                    </div>
                </div>
            ))}
        </div>
        {/*show the carousel if the index of clicked image is set */}
        {showCarousel!=null&&<Carousel clickedImageIndex={showCarousel} imageList={images} setCarousel={setCarousel} />}
        </>
    )
}