import React from 'react';
import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import { Interface } from 'readline';

type Props = {
    title: string;
    artist: string;
    album: string;
};

const Item = (props: Props) => {
    return (
        <Card style={{ background: '#F5F5F5', maxWidth: 700, marginTop: 20 }}>
            <CardContent>
                <Typography variant="h4" component="div">
                    Title: {props.title}
                </Typography>
                <br />
                <Typography variant="h5" component="div">
                    Artist: {props.artist}
                </Typography>
                <br />
                <Typography variant="h6" component="div">
                    Album: {props.album}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Item;
