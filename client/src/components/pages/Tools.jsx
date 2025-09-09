import React, { useEffect, useState } from "react";
import '../../styles/Shared.css';
import '../../styles/WStyles.css';
import '../../styles/Tools.css';
import '../../styles/Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { getTools, submitRental } from "../../actions/ToolsAction";
import Search from "../common/Search";
import ServiceBanner from "../common/ServiceBanner";
import ToolList from "../common/ToolList";
import Modal from "../common/Modal";
import Contact from "../common/Contact";
import { serviceLink1, serviceLink2 } from '../common/consts/serviceItems';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import {Badge, Button} from '@mui/material';

export const Tools = () => {
    const dispatch = useDispatch();
    const {tools, success} = useSelector(state => state.toolsState);
    const [toolList, setTools] = useState([]);
    const [rentList, setRentList] = useState([]);
    const [open, setOpen] = useState(false);
    const [hide, setHidden] = useState(false);



    useEffect(() => {
        dispatch(getTools());
    }, []);

     useEffect(() => {
        setTools(tools)
    }, [tools]);

    useEffect(() => {
        if (success) {
            setOpen(false);
            setRentList([]);
            dispatch({type: "RENTAL_ERROR"});
        }
    }, [success]);

    useEffect(() => {
        if (!rentList.length) setOpen(false);
    }, [rentList]);

    useEffect(()=>{
        document.title = 'Tools';
    }, []);

    const handleRentalList = () => {
        if (rentList.length) setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleRemove = (_id) => {
        let newlist = [...rentList];
        newlist = newlist.filter(tool => tool._id !== _id);
        setRentList([...newlist]);
    }

    const RentList = (
        <Modal
            open={open}
            onClose={handleClose}
            title={"List of tools to rent"}
        >
            {rentList.map((tool, index) => {
                return (
                    <div key={index} className="grid-x2-l">
                        <div role="listitem" className="thumb w-dyn-item">
                            <img src={tool.photo} loading="eager" alt="" />
                        </div>
                        <div>
                            <span style={{fontSize: '1.2em', fontWeight: '550'}}>
                                <p>Name: {tool.name}</p>
                                <p>Quantity: {tool.quantity}</p>
                            </span>
                            <Button sx={{backgroundColor:"red", color: "white", padding: "0.6em 1em"}} size="small" variant="contained" onClick={() => handleRemove(tool._id)}>Remove</Button>
                        </div>
                    </div>
                )
            })}
            <Contact 
                option={rentList}
                hideEmail={true}
                hidePhone={true}
                message={'Please provide you contact details along side the duration of the rental  and we will reach out concerning our rental prices'}
                onSubmit = {submitRental}
            />
        </Modal>
    )

 

    return (
            <section className={`${hide||open ? "section overflow-hidden popper" : "section overflow-hidden"}`}>
                <div className="section bg-tools">
                    <div className="w-layout-blockcontainer container first w-container">
                        <div className="home-content">
                            <div className="grid-x2-l fr-3-2">
                                <div id="w-node-_63c10bb6-82bf-7725-8a25-fd9f16b94102-e73ecd3d">
                                    <div className="display-1 my-10">
                                        <h1 data-w-id="2a9881ba-7e76-f21e-01e2-456008397da2" className="tools-banner mx-0">Rent the tools you need</h1>
                                        <h1 data-w-id="31fa990e-9ef0-7741-d03d-82945316bf2b" className="tools-banner mx-0">to keep running</h1>
                                    </div>

                                    <Search
                                        items={toolList}
                                        setItems={setTools}
                                        reload={getTools}
                                    />
                                    <Badge badgeContent={rentList.length} color="primary" onClick={handleRentalList}>
                                        <HomeRepairServiceOutlinedIcon fontSize="large" />
                                    </Badge>

                                </div>
                                <div id="w-node-_63c10bb6-82bf-7725-8a25-fd9f16b9410e-e73ecd3d"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {RentList}
                <ToolList 
                    setRentList={setRentList} 
                    tools={toolList}
                    setHidden={setHidden}
                />

                <ServiceBanner
                    title={"Need more than just tools?"}
                    links={[serviceLink1]}
                    service_tiles={serviceLink2}
                />
            </section>
    );
}

export default Tools