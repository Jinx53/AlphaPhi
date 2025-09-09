import React, { useState, useEffect, useRef } from "react";
import '../../styles/Services.css';
import '../../styles/WStyles.css';
import '../../styles/Home.css';
import '../../styles/About.css';
import '../../styles/Shared.css';
import background from "../../images/staff-training-background.jpg";
import background500 from "../../images/staff-training-background-p-500.jpg";
import background800 from "../../images/staff-training-background-p-800.jpg";
import month_it_training from "../../images/month-it-training.jpeg";
import scholarship_students_training from "../../images/scholarship-students-training.jpeg";
import another_service_training from "../../images/another-service-training.jpeg";
import Service from '../common/Service';
//TODO: Change all static data to come from backend and to be uploaded from the admin side. Like testimonials and more


const ITEMS = [
    { image: another_service_training },
    { image: scholarship_students_training },
    { image: month_it_training },
];

export const Trainings = () => {

    useEffect(() => {
        document.title = 'Trainings';
        //dispatch(getServices('training'));
    }, []);


    const trainingItems = [
        {
            photo: month_it_training,
            title: "3 month introductory training for IT students",
            location: "Boskel Nigeria plc, Port Harcourt",
            description: "3 months training conducted at Shell petroleum corp. at Bonny for new staff recruitment.",
        },
        {
            photo: scholarship_students_training,
            title: "Scholarship students workshop training program",
            location: "Boskel Nigeria plc, Port Harcourt",
            description: "Alpha-phi conducted and trained scholarship students on mechanical engineering workshop tools, identification, uses and maintenance with practicals.",
        },
        {
            photo: another_service_training,
            title: "Metering and Calibration Training",
            location: "Boskel Nigeria plc, Port Harcourt",
            description: "4 week training of Frustrum Nigeria Ltd workers on metering and calibration using electronic equipment and sensors.",
        }
    ];

    return (
        <>
            <Service
                gallery_title={"completed workshops"}
                contact_description={"Book a staff training workshop"}
                SERVICE={trainingItems}
                modal_title={"Training pictures with trainee"}
                ITEMS={ITEMS}
                service_title={"Staff trainings and workshops"}
                service_body={"We offer 3 months or 6 month staff trainings. Get trainees, interns or new staff up to speed in a more organized and comprehensive manner. We provide comprehensive workshops with hands on experience on your facility grounds. Let’s get started."}
                background={background}
                background500={background500}
                background800={background800}
            />

        </>
    );
}

export default Trainings