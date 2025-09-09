import React, { useState, useEffect, useRef } from "react";
import { Paper, Button, TextField, Box, Input, Avatar,  useTheme, useMediaQuery } from '@mui/material';
import DeleteItem from "../common/DeleteItem";
import { useSelector, useDispatch } from 'react-redux';
import { getTestimonial, addTestimonial, deleteTestimonial, editTestimonial } from "../../actions/TestimonialAction";
import { clearErrors } from "../../actions/ErrorAction";
import useErrorMessage from "../common/useErrorHook";
import Modal from "../common/Modal";

export const Testimonial = () => {
    const [image, changeImage] = useState(null);
    const photoRef = useRef(null);
    const inputRef = useRef(null)
    const [profession, setProfession] = useState("");
    const [testimonial, setTestimonial] = useState("");
    const [author, setAuthor] = useState("");
    const dispatch = useDispatch();
    const {testimonials} = useSelector(state => state.testimonials);
    const {isAuthenticated} = useSelector(state => state.auth);
    const [open, setOpen] = useState(0); 
    const errorMessage = useErrorMessage("ADD_TESTIMONIAL");
    
    useEffect(() => {
        document.title = 'Testimonial';
        dispatch(getTestimonial());
    }, []);

    let clearTestimonial = () => {
        dispatch(clearErrors());
        changeImage(null);
        setProfession("");
        setTestimonial("");
        setAuthor("");
        inputRef.current = null;
        photoRef.current = null;
    }


    let onSubmit = (e) => {
        e.preventDefault();
        const img = photoRef.current;
        const testimonial_detail = { profession, testimonial, image: img, author };
        dispatch(addTestimonial(testimonial_detail));
        clearTestimonial();
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        const img = photoRef.current;
        const testimonial_detail = {_id: open, profession, testimonial, image: img, localview: image, author };
        dispatch(editTestimonial(testimonial_detail));
        setOpen(0);
        clearTestimonial();
    }

    let onChange = (e) => {
        if (e.target.name === "image"){ 
            changeImage(URL.createObjectURL(e.target.files[0]));
            photoRef.current = e.target.files[0];
        }
        if (e.target.name === "profession") setProfession(e.target.value);
        if (e.target.name === "testimonial") setTestimonial(e.target.value);
        if (e.target.name === "author") setAuthor(e.target.value);
    }

    let handleEdit = (data) => {
        const { _id, profession, testimonial, author, image } = data;
        setProfession(profession);
        setTestimonial(testimonial);
        setAuthor(author);
        changeImage(image);
        setOpen(_id);
    }

    const handleClose = () => {
        setOpen(0);
        clearTestimonial();
    }


    const cardStyle = {
        display: 'grid',
        gridAutoColumns: 'auto',
        paddingLeft: '2em'
    } 

    const cardStylemb = {
        display: 'grid',
        gridAutoColumns: 'auto',
        paddingLeft: '1em'
    } 
    
    const AvatarStyle = {
        width: '10em', 
        height: '8em', 
        float: 'left'
    }

    const AvatarStylemb = {
        width: 'auto', 
        height: 'auto',
    }

    const theme = useTheme();
  
    const phoneStyle = useMediaQuery(theme.breakpoints.down('laptop'));


    let viewTestimonial = (data) => {
        return (
            <Modal
                title={`Edit ${data.author} Testimonial`}
                open={open === data._id}
                onClose={handleClose}
            >
                    <img src={image} loading="lazy"/>
                <br /><Input type="file" placeholder='Enter image' name="image" onChange={onChange} inputRef={inputRef} />
                <TextField sx={{width: '100%'}} variant="standard" multiline rows={3} placeholder="Edit testimonial" name="testimonial" onChange={onChange} defaultValue={testimonial} />
                <TextField sx={{width: '100%'}} variant="standard" multiline placeholder="Edit testimonial detail profession" onChange={onChange} name="profession" defaultValue={profession}  />
                <Input type="text" placeholder="Edit testimonial author"  value={author} name="author" onChange={onChange}/>
                <Button variant="contained" sx={{backgroundColor: "green"}} onClick={handleSubmit}>Submit Change</Button>
                <Button variant="contained" 
                    sx={{backgroundColor: "red", '&:hover': {
                        backgroundColor: 'white',
                        borderColor: 'red',
                        boxShadow: '3px 3px red, -1em 0 .4em olive',
                    }}} 
                    onClick={handleClose}>
                        Close
                </Button>
            </Modal>
        )
    }

    return (

        <div>
            <h2>Add testimonial detail</h2>
            <Box
                component="form">
                <h3>{errorMessage}</h3>
                <label htmlFor="image">Upload a picture</label>
                <br /><Input type="file" placeholder='Enter image' name="image" onChange={onChange} inputRef={inputRef} />
                <br /><TextField sx={{width: '100%'}} variant="standard" multiline rows={4}  placeholder='Enter testimonial' name="testimonial" onChange={onChange} defaultValue={testimonial} />
                <br /><TextField sx={{width: '100%'}} variant="standard" multiline placeholder='Enter profession'  onChange={onChange} name="profession" defaultValue={profession} />
                <br /><TextField sx={{width: '100%'}} variant="standard" multiline placeholder='Enter author' onChange={onChange} name="author" defaultValue={author} />
                <br /><Button variant="outlined" color="success" onClick={onSubmit}>Submit</Button>
            </Box>

            <Paper>
                {!!testimonials.length && testimonials.map((data, i) =>
                    <div key={i} style={phoneStyle ? {} : { align: 'center', height: '12em' }}>
                        {viewTestimonial(data)}
                        <div style={{ paddingLeft: "1em", paddingTop: "1em" }}>
                            <Avatar
                                sx={phoneStyle ? AvatarStylemb : AvatarStyle}
                                variant='rounded'
                                src={data.image}
                            />
                            <div style={phoneStyle ? cardStylemb : cardStyle}>
                                <p>{data.profession}</p>
                                <p>{data.testimonial}</p>
                                <p>{data.author}</p>
                                {isAuthenticated && <DeleteItem remove={deleteTestimonial} id={data._id} /> }
                                <Button color="info" variant={"outlined"} onClick={() => handleEdit(data)} >Edit</Button>
                            </div>
                        </div>
                        <br />
                    </div>
                )}
            </Paper>
        </div>
    );
}

export default Testimonial