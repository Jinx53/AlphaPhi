import React from 'react';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import LibraryBooksSharpIcon from '@mui/icons-material/LibraryBooksSharp';
import HomeRepairServiceSharpIcon from '@mui/icons-material/HomeRepairServiceSharp';
import PermContactCalendarSharpIcon from '@mui/icons-material/PermContactCalendarSharp';
import ReviewsIcon from '@mui/icons-material/Reviews';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export const mainNavbarItems =[
    {
        index: 0,
        icon: <LibraryBooksSharpIcon/>,
        label: 'About us',
        route: 'admin/aboutus',
    },
    {
        index: 1,
        icon: <PermContactCalendarSharpIcon/>,
        label: 'Contact us',
        route: 'admin/contact',
    },
    {
        index: 2,
        icon: <GroupsSharpIcon/>,
        label: 'Resource team',
        route: 'admin/resourceteam',
    },
    {
        index: 3,
        icon: <InfoSharpIcon/>,
        label: 'Services',
        route: 'admin/services',
    },
    {
        index: 4,
        icon: <HomeRepairServiceSharpIcon/>,
        label: 'Tools',
        route: 'admin/tools',
    },
    {
        index: 5,
        icon: <ReviewsIcon/>,
        label: 'Testimonial',
        route: 'admin/testimonial',
    },
    {
        index: 6,
        icon: <BookmarkAddIcon/>,
        label: 'Subscribers',
        route: 'admin/subscribers',
    },
    {
        index: 7,
        icon: <PeopleSharpIcon/>,
        label: 'Users',
        route: 'admin/users',
    }
]