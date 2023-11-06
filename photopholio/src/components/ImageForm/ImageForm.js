import styles from './ImageForm.module.css'
import Button from '../Button/Buttton';
import { useEffect, useState } from 'react';
export default function ImageForm(props){
    const [title,setTitle]=useState('');
    const [url,setUrl]=useState('');
    useEffect(()=>{
        if(props.editImage){
            setTitle(props.editImage.title);
            setUrl(props.editImage.url);
        }
    },[props.editImage])
    function clearInput(){
        setTitle('');
        setUrl('');
    }
    return (
        <form className={styles.formCon}  >
            <h2>{props.heading}</h2>
            <input className={styles.title} placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} required />
            <input className={styles.url} placeholder='Image URL' value={url} onChange={(e)=>setUrl(e.target.value)} required />
            <div className={styles.btnCon} >
                <Button onClick={(e)=>{
                    e.preventDefault();
                    if(title===''||url==''){
                        return;
                    }
                    props.onSubmitHandler({title,src:url,createdOn:new Date()});
                    clearInput();
                }} >
                    {props.editImage?'Update':'Add'}
                </Button>
                <Button bg='red' onClick={(e)=>{
                    e.preventDefault();
                    clearInput();
                    }} >
                    Clear
                </Button>
            </div>        
        </form>
    );
}