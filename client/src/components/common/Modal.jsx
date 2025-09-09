import React, { useRef, useEffect } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Tools.css';

const Modal = ({ title, textColor, children, onClose, open, arialabelledby, ariadescribedby }) => {

    const viewModel = useRef(null);

    const autoScrollToView = () => {
        viewModel.current.scrollIntoView(true);
    }

    useEffect(() => {
       if (open) autoScrollToView();
    }, [open]);

    return (
        <div ref={viewModel} style={(open) ? { display: "flex" } : { display: "none" }} className="popup-wrapper">

            <div className="tool-details overflow-scroll" style={{color: textColor}} aria-labelledby={arialabelledby} >
                {title && (<>
                    <h3>{title}</h3>
                    <div className="hr bg-primary hr-bar"></div>
                </>)}
                <a onClick={onClose} className="button close w-button"><CloseOutlinedIcon sx={{ color: 'red' }} /></a>
                <div className="html-embed w-embed w-iframe" aria-describedby={ariadescribedby}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;