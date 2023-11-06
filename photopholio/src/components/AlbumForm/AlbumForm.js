import styles from './AlbumForm.module.css';
import Button from '../Button/Buttton';
import { useState } from 'react';
import db from '../../config/firebaseInit';
import {toast} from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
export default function AlbumForm(){
    //stores the typed title for new album
    const [newAlbumtitle,setAlbumtitle]=useState('');
    // handle the submition of form for creating new album
    async function handleSubmit(e){
        e.preventDefault();
        //return if title is empty
        if(newAlbumtitle===''){
            return;
        }
        try {
            //adding the new created album in albums collection
            await addDoc(collection(db,'albums'),{
                title:newAlbumtitle,
                createdOn:new Date()
            });
            //clearing the title feild and creating toast messages
            setAlbumtitle('');
            toast.success("Album created successfully.", {
                position: toast.POSITION.TOP_CENTER
              });
        } catch (error) {
            toast.error("Something went wrong !", {
                position: toast.POSITION.TOP_LEFT
              });
        }
    }
    return (<>
    <div className={styles.formContainer} >
        <h2 className={styles.formHeading} >Create an album</h2><br/>
        <form className={styles.inputContainer} onSubmit={handleSubmit} >
            <input placeholder='Album Title' className={styles.nameInput} value={newAlbumtitle} onChange={(e)=>setAlbumtitle(e.target.value)} required />
            <Button>
                Create
            </Button>
            {/*passing props for custom styling of reusable style component*/}
            <Button bg='red' onClick={(e)=>{
                e.preventDefault();
                setAlbumtitle('');}} >
                Clear
            </Button>
        </form>
    </div>
    </>)
}