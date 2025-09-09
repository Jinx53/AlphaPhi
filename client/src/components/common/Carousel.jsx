import React, { useRef, useEffect, useState } from 'react'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Tools.css';

const Carousel = ({ ITEMS, VIEW, children }) => {


    const [carousel, setCarousel] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    let slideInterval;
    const intervalTime = 7 * 1000;

    const carouselStyle = {
        transform: `translateX(${-100 * slideIndex}%)`,
        opacity: '1',
        transition: 'transform 500ms ease 0s',
        textAlign: 'center'
    }

    useEffect(() => {
        setCarousel([...ITEMS])
    }, [])

    useEffect(() => {
        autoPlay();
        return () => clearInterval(slideInterval);
    }, [slideIndex])

    const autoPlay = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    const nextSlide = () => {
        setSlideIndex(index => {
            if (index === (carousel.length - 1)) return 0;
            else return index + 1;
        })
    }

    const previousSlide = () => {
        setSlideIndex(index => {
            if (index === 0) return (carousel.length - 1);
            else return index - 1;
        })
    }

    const notFound = (
        <div>No item found.</div>
    );

    const slideShow = (item, index) => {
        return (
            <div key={index} data-w-id="c2b9a754-408c-636c-37c0-ceddd64cb308" style={carouselStyle} className="w-slide" aria-hidden={slideIndex !== index}>
                <div role="list">
                    <div role="listitem" className="w-dyn-item">
                        {
                            index === slideIndex && (
                                <>
                                    {VIEW(item)}
                                    {children}
                                </>

                            )
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-slider-mask">
                {!!carousel.length ?  carousel.map(slideShow) : notFound}
            </div>
            <div onClick={previousSlide} aria-label="View previous testimonial" className="testimonial-navbtn left w-slider-arrow-left">
                <NavigateBeforeIcon color="inherit" className="w-icon-slider-left" />
            </div>
            <div onClick={nextSlide} aria-label="View next testimonial" className="testimonial-navbtn w-slider-arrow-right">
                <NavigateNextIcon className="w-icon-slider-right" />
            </div>
        </>
    )
}

export default Carousel;