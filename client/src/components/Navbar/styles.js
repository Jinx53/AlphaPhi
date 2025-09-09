export const navbarStyles = {
    drawer: {   
        width: 220,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 220,
            boxSizing: 'border-box',
            backgroundColor: '#091579',
            color: 'white'
        },
    },
    icon: {
        color: 'white',
        marginLeft: '20px'
    },
    text: {
        '& span': {
            marginLeft: '-10px',
            fontWeight: '600',
            fontSize: '16px'
        }
    }
};