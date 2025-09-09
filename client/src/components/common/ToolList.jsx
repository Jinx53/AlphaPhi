import React, { useState, useEffect } from "react";
import Tool from "./Tool";
import Modal from "./Modal";
import { useDispatch } from 'react-redux';
import { getTools } from "../../actions/ToolsAction";
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Tools.css';

export const ToolList = ({ setRentList, tools, setHidden, maxLimit }) => {
    const [open, setOpen] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTools());
    }, []);

    const handleClose = () => {
        setHidden(false);
        setOpen(0);
    }
    
    const handleViewTool = (tool) => {
        const { _id } = tool;
        setOpen(_id);
        setHidden(true);
    }

    const viewTool = (tool) => (
        <Modal
            open={(open === tool._id)}
            onClose={handleClose}>
            <Tool
                tool={tool}
                handleClose={handleClose}
                setRentList={setRentList}
            />
        </Modal>
    )

    const notFound = (<div className="w-dyn-empty">
        <div>No items found.</div>
    </div>)

    return (
        <div className="w-layout-blockcontainer container my-20 w-container">
            <div className="my-10">
                <div className="w-dyn-list">
                    <div role="list" className="collection-list">
                        {!!tools?.length ?
                            (tools||[]).slice(0, maxLimit).map((tool, index) =>
                                <div key={index} role="listitem" className="w-dyn-item">

                                    {viewTool(tool)}

                                    <a data-w-id="e388d4b7-0c18-cf3b-8ad5-ec76631d18f9" onClick={() => handleViewTool(tool)} className="tool-item-container w-inline-block">
                                        <div className="tool-item-image-container"><img src={tool.photo} loading="lazy" alt="" className="tool-img tools-img-animation" /></div>
                                        <div className="tool-item-name">{tool.name}</div>
                                    </a>

                                </div>)
                            :
                            notFound
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ToolList