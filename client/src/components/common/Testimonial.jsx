import React, { useState, useEffect } from 'react'
import { Button, Box, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTestimonial } from "../../actions/TestimonialAction";
import '../../styles/Home.css';
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import testimg from '../../images/school.svg';


const Testimonial = () => {
    const dispatch = useDispatch();
    const {testimonials} = useSelector(state => state.testimonials)
    const [slideIndex, setSlideIndex] = useState(0);
    let slideInterval;
    const intervalTime = 7 * 1000;

    const testimonialStyle = {
        transform: `translateX(${-100 * slideIndex}%)`,
        opacity: '1',
        transition: 'transform 500ms ease 0s'
    }

    useEffect(() => {
        dispatch(getTestimonial());
    }, []);

    useEffect(() => {
        autoPlay();
        return () => clearInterval(slideInterval);
    }, [slideIndex])

    const autoPlay = () => {
        slideInterval = setInterval(nextTestimonial, intervalTime);
    }

    const nextTestimonial = () => {
        setSlideIndex(index => {
            if (index === (testimonials.length - 1)) return 0;
            else return index + 1;
        })
    }

    const prevTestimonial = () => {
        setSlideIndex(index => {
            if (index === 0) return (testimonials.length - 1);
            else return index - 1;
        })
    }

    const slideShow = (testimonial, index) => {

        return (
            <div key={index} data-w-id="c2b9a754-408c-636c-37c0-ceddd64cb308" style={testimonialStyle} className="w-slide" aria-hidden={slideIndex !== index}>
                <div>
                    <div role="list">
                        <div role="listitem" className="testimonial-item w-dyn-item">
                            <div className={ index === slideIndex ?  "text-large text-just w-richtext testimonial-profession" : "text-large text-just w-richtext"}>
                                <p>{testimonial.testimonial}</p>
                            </div>
                            <div className="testimonial-auth">
                                <img alt="" loading="lazy" src={testimonial?.image || testimg} className={ index === slideIndex ? "testimonial-dp" : ""} />
                                <div>
                                    <div aria-label="testimonial author name" className={ index === slideIndex ? "testimonial-author" : ""}>{testimonial.author}</div>
                                    <div aria-label="testimonial author profession" className={index === slideIndex ?  "testimonial-profession" : ""}>{testimonial.profession}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <section className="section short bg-dark-25 bg-testimonial">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="max-w-75-l my-20">
                        <div>
                            <h3 className="color-primary">Hear from our clients</h3>
                            <div className="hr hr-bar"></div>
                        </div>
                        <div>
                            <div className="testimonials w-slider"  >
                                <div className="w-slider-mask">
                                    {testimonials.map((testimonial, index) => slideShow(testimonial, index))}
                                </div>
                                <div onClick={prevTestimonial} aria-label="View previous testimonial" className="testimonial-navbtn left w-slider-arrow-left">
                                    <NavigateBeforeIcon color="inherit" className="w-icon-slider-left" />
                                </div>
                                <div onClick={nextTestimonial} aria-label="View next testimonial" className="testimonial-navbtn w-slider-arrow-right">
                                    <NavigateNextIcon className="w-icon-slider-right" />
                                </div>
                                <div className="testimonial-navdots w-slider-nav">
                                    {testimonials.map((_, index)=> {
                                        return(
                                            <span onClick={() => setSlideIndex(index)} aria-label={`View testimonial ${index + 1}`} key={index} >
                                                {(slideIndex === index) ? <FiberManualRecordIcon aria-hidden fontSize={"small"}/> : <FiberManualRecordOutlinedIcon aria-hidden fontSize={"small"}/>}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Testimonial;