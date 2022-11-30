import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from '@mui/material';


export function Sidebar() {

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                width: 220,
                boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="right"
            >
            <Toolbar />
                <Divider />
                    <List>
                        {["Home",'Profile', 'Cookbook', 'Saved Posts', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <Avatar /> : <Avatar />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List>
                <Divider />
            </Drawer>
        </Box>
    )
}