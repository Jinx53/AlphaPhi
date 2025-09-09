
import training from "../../../documents/training.json";
import repair from "../../../documents/repair.json";
import produrement from "../../../documents/produrement.json";
import fabrication from "../../../documents/fabrication.json";
import consultation from "../../../documents/consultation.json";
import rental from "../../../documents/rental.json";

import manage_accounts from "../../../images/manage_accounts.svg";
import handyman from "../../../images/handyman.svg";

//https://jitter.video/templates/backgrounds/

const ServiceItems = [
    {
        index: 1,
        title: 'Staff training',
        subtitle: '3 - 6 months physical workshops',
        body: 'We offer 3 & 6 months staff training programs with virtual and physical options. We cover a range of courses tailored to improve the proficiency and skills of pipeline workers. A minimum of 10 participants is required. Our tutors are well experience in the field as well as in the tutelage of staffs.',
        route: 'services/trainings',
        button_description: 'Book a training',
        animate_image: training
    },
    {
        index: 1,
        title: 'Repair and maintenance',
        subtitle: 'Calibration, measurements and fixes',
        body: 'We offer 3 & 6 months staff training programs with virtual and physical options. We cover a range of courses tailored to improve the proficiency and skills of pipeline workers. A minimum of 10 participants is required. Our tutors are well experience in the field as well as in the tutelage of staffs.',
        route: 'services/repair',
        button_description: 'Book repair services',
        animate_image: repair
    },
    {
        index: 1,
        title: 'Equipment procurement',
        subtitle: 'Purchase, shipping and clearance',
        body: 'We purchase, ship, clear and deliver equipment on behalf of companies. Our procurement team is always available to take, update and close your orders. Acquiring the equipment, you need has never been easier. Contact us to get started.',
        route: 'services/procurement',
        button_description: 'Request procurement',
        animate_image: produrement
    },
    {
        index: 1,
        title: 'Fabrication',
        subtitle: 'Component cutting and fabrication',
        body: 'We offer 3 & 6 months staff training programs with virtual and physical options. We cover a range of courses tailored to improve the proficiency and skills of pipeline workers. A minimum of 10 participants is required. Our tutors are well experience in the field as well as in the tutelage of staffs.',
        route: 'services/fabrication',
        button_description: 'Book repair services',
        animate_image: fabrication
    },
    {
        index: 1,
        title: 'Consultancy',
        subtitle: 'Purchase, shipping and clearance',
        body: 'We purchase, ship, clear and deliver equipment on behalf of companies. Our procurement team is always available to take, update and close your orders. Acquiring the equipment, you need has never been easier. Contact us to get started.',
        route: 'services/consultancy',
        button_description: 'Request procurement',
        animate_image: consultation
    },
    {
        index: 1,
        title: 'Equipment leasing and rentals',
        subtitle: 'Lease, rent and use',
        body: 'We offer our equipments for leasing or rentals. We have specialized personals to assist with the use of the equipments if one is needed. Contact us to get started.',
        route: 'services/rentals',
        button_description: 'Rent equipment',
        animate_image: rental
    },
]

const serviceLink1 = [
    {
        link_name: "Equipment leasing and rentals",
        route: "services/rentals",
        index: 1,
    },
    {
        link_name: "Staff training",
        route: "services/trainings",
        index: 1,
    },
]

const serviceLink2 = [
    {
        icon: handyman,
        description: "Our maintenance teams are well trained and experienced in their respective area of specialization",
        link_name: "Repair and maintenance",
        route: "services/repair",
        index: 1,
    },
    {
        icon: manage_accounts,
        description: "Need professional assistance with problem solving in your facility. We our consultation is just right for you.",
        link_name: "Consultancy",
        route: "services/consultancy",
        index: 1,
    },
]

const serviceLink3 = [
    {
        link_name: "Explore tools",
        icon: handyman,
        description: "We are the number one go-to shop for all sorts of pipeline engineering works in Nigeria. Browse our collection of world-class equipment.",
        route: "tools",
        index: "0",
    },
    {
        link_name: "Explore services",
        icon: manage_accounts,
        description: "We offer a range of services that are invaluable to pretro-chemical and mechanical industry. Explore and book any of our services now.",
        route: "services",
        index: "1",
    },
]




export {ServiceItems, serviceLink1, serviceLink2, serviceLink3};