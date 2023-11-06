import { useEffect, useState } from "react";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";
import styles from './AlbumList.module.css';
import Button from "../Button/Buttton";
import db from "../../config/firebaseInit";
import Spinner from "react-spinner-material";
import {onSnapshot,collection, query, orderBy, getCountFromServer, limit, doc, getDocs} from 'firebase/firestore' 
export default function AlbumList(){
    //decides whether to show form to create album or not
    const [showAlbumForm,setAlbumForm]=useState(false);
    //refers to clicked album if a album is clicked 
    const [openAlbum,setOpenAlbum]=useState(null);
    //stores the list if albums
    const [albumList,setAlbumList]=useState([]);
    //decides when to show the loading spinner
    const [spinnerVisible,setSpinner]=useState(true);
    // creates event handler which listens for rela time updates
    useEffect(()=>{
        //custom query for getting data in ordred manner
        const q=query(collection(db,'albums'),orderBy('createdOn','desc'));
        const unsub=onSnapshot(q,async(albums)=>{
            const newAlbums = [];
            for (const album of albums.docs) {
                //adds thumbnail in album locally on first render
                const thumbnail = await findThumbnail(album.id);
                newAlbums.push({ id: album.id,thumbnail,...album.data() });
            }
            setAlbumList(newAlbums);
            // hides the loading spinner after the data is fetched
            setSpinner(false);
        })
        return unsub;
    },[])
    //updates the thumbnail every time a album is clicked because after opening a album new images may have been added or deleted.
    useEffect(()=>{
        async function updateThumbnail(){
            const albumWithUpdatedThumbnail=[];
            for(const album of albumList){
                //updates thumbnails locally 
                const thumbnail=await findThumbnail(album.id)
                albumWithUpdatedThumbnail.push({...album,thumbnail});
            }
            setAlbumList(albumWithUpdatedThumbnail);
        }
        updateThumbnail();
    },[openAlbum]);
    //handles album click
    function handleAlbumClick(id,title){
        //sets the id and title of clciked album
        setOpenAlbum({id,title});
        //closes the album form if its open
        setAlbumForm(false);
    }
    // finds the thumnail for every album 
    async function findThumbnail(albumId){
        const albumRef=doc(db,'albums',albumId);
        const imageListRef= collection(albumRef,'images');
        const imagesCount=(await getCountFromServer(imageListRef)).data().count;
        //if the album is not empty the latest added image is set as thumbnail
        if(imagesCount>0){
            const q = query(imageListRef, orderBy('createdOn','desc'),limit(1));
            const querySnapshot = await getDocs(q);
            const docData = querySnapshot.docs[0].data();
            return docData.src;
        }
        else{
            // if album is empty then empty album images is set as thumbnail
            return 'https://cdn.iconscout.com/icon/premium/png-256-thumb/empty-folder-1518823-1285150.png'
        }
    }
    return (
        <>
        {showAlbumForm&&<AlbumForm />}
        {/*if any album is not opened the render all albums*/ }
        {(!openAlbum)&&<>
        <div className={styles.headingContinaer} >
            <h2>Your Albums</h2>
            <Button onClick={()=>setAlbumForm(!showAlbumForm)} bg={showAlbumForm?'red':'blue'} >{showAlbumForm?'Cancel':'Add album'}</Button>
        </div>
        <div className={styles.albumContainer}>
            {/*show spinner which albums are fetced from database*/}
        <Spinner  radius={120} color={"#87C"} stroke={5} visible={spinnerVisible}  className={styles.spinner} />
                {albumList.map((album,ind)=>{
                    return(<div className={styles.album} key={ind} onClick={()=>handleAlbumClick(album.id,album.title)} >
                        <div className={styles.imageContainer} 
                        style={{backgroundImage:`url(${album.thumbnail})`}} >
                            <div className={styles.hoverEffect} >

                            </div>
                        </div>
                        <div className={styles.albumTitle} ><b>{album.title||'title'}</b></div>
                    </div>)
                })}
            
        </div>
        </>
        }
        {/*open the image list if any album is clicked*/}
        {openAlbum&&<ImageList album={openAlbum} setAlbum={setOpenAlbum} />}
        </>
    )
}