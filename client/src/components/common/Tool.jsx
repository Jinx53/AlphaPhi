import React, { useState, useEffect } from "react";
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Tools.css';
import { useMediaQuery, useTheme } from '@mui/material';

export const Tool = ({ tool, handleClose, setRentList }) => {
    const [quantity, setQuantity] = useState(0);
    const [activeTab, setActiveTab] = useState(false);
    
    const handleOnChange = (e) => setQuantity(e.target.value)

    const handleAdd = () => {
        setQuantity(prev => {
            if (quantity < tool.quantity) return prev + 1;
            else return quantity
        })
    }

    const handleRemove = () => {
        setQuantity(prev => {
            if (quantity > 0) return prev - 1;
            else return quantity;
        })
    }

    const handleAddTool = (e) => {
        e.preventDefault();
        const rent = {
            _id: tool._id,
            photo: tool.photo,
            name: tool.name,
            quantity: quantity
        };
        let exists = false;
        if (quantity) {
            setRentList((prev) => {
                let exist = prev.map(rental => {
                    if(rental._id === tool._id) exists = true, rental.quantity = quantity;
                    return rental
                })
                if(exists){
                    exists = false
                    return [ ...exist];
                }else{
                    return [rent, ...prev]
                }
            })
        }
        handleClose();
    }


    const theme = useTheme();
    const tabletView = useMediaQuery(theme.breakpoints.down('laptop'));
    const phoneView = useMediaQuery(theme.breakpoints.down('tablet'));
    const iPadPro = useMediaQuery(theme.breakpoints.only('laptop'));
    const items = iPadPro ? 6 : tabletView ? 5 : 4

    const imgList = (tool) => new Array(items).fill(tool.photo).map((photo, index) => 
    <div key={index} role="listitem" className="thumb w-dyn-item">
        <img src={photo} loading="eager" alt=""/>
    </div>)

    return (

        <div className="max-w-70">
            <div className="grid-x2-l fr-1">
                <div>
                    <a  className="thumb text-center large w-inline-block w-lightbox">
                        <img id="img-sizes" src={tool.photo} loading="lazy" alt=""/>
                    </a>
                    <div className="overflow-scroll padding-l-2-25">
                        <div role="list" className="flex-h gap-10">
                            {!phoneView && imgList(tool)}
                        </div>
                    </div>
                </div>
                <div id="w-node-e8d4de4d-8b27-b260-33e0-f716b2b3fe8d-2e97a9e6">
                    <h2>{tool.name}</h2>
                    <div className="tools-description my-10 w-tabs">
                        <div className="w-tab-menu">
                            <a data-w-tab="Description" className={`tab-item w-inline-block w-tab-link ${!activeTab ? 'w--current' : ''}`} onClick={() => setActiveTab(false)}>
                                <div>Description</div>
                            </a>
                            <a data-w-tab="Specification" className={`tab-item w-inline-block w-tab-link ${activeTab ? 'w--current' : ''}`} onClick={() => setActiveTab(true)}>
                                <div>Specification</div>
                            </a>
                        </div>
                        <div className="tab-content w-tab-content">
                            <div data-w-tab="Description" className={`overflow-scroll w-tab-pane ${!activeTab ? 'w--tab-active' : ''}`}>
                                <div>
                                    <div className="w-richtext">{tool.description || "Not Available"}</div>
                                </div>
                            </div>
                            <div data-w-tab="Specification" className={`overflow-scroll w-tab-pane ${activeTab ? 'w--tab-active' : ''}`}>
                                <div>
                                    <div className="w-richtext">{tool.specification || "Not Available"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-20 w-form">
                        <>
                            <div className="grid-x2-l fr-1-2">
                                <div id="w-node-ca70c29c-d096-af58-b419-56a813a73fae-2e97a9e6">Specify quantity:</div>
                                <div className="flex-h gap-10 my-02">
                                    <button onClick={handleAdd} className="button text-icon w-button">+</button>
                                    <input type="number" className="form-input w-input" min="0" max={tool.quantity} maxLength="256" name="quantity" data-name="quantity" placeholder="0" id="quantity" required="" value={quantity} onChange={handleOnChange} />
                                    <button onClick={handleRemove} className="button text-icon w-button">-</button>
                                </div>
                                {tool.quantity === quantity && <span>Max quantity reached</span>}
                            </div>
                            <button onClick={handleAddTool} className="button _w-100 text-center w-button">Add to toolsbox</button>
                        </>
                    </div>
                    <div>
                        <a href="#" className="text-link color-primary">Terms and conditions</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tool