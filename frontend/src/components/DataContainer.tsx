import React from 'react';
import { Alert, AlertTitle, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResults } from '../redux/siteSlice';
import Box from '@mui/material/Box';
import { setSearchTerm, setOffset } from '../redux/searchSlice';
import { setData } from '../redux/siteSlice';
import Item from './Item';
import { useEffect } from 'react';

const DataContainer = () => {
    const dispatch = useDispatch<any>();
    const dataSource = useSelector((state: any) => state.siteData.site.data);
    const offset = useSelector((state: any) => state.searchData.site.offset);
    const searchTerm = useSelector((state: any) => state.searchData.site.searchTerm);

    const [error, setError] = React.useState(false);
    const [resultWarning, setResultWarning] = React.useState(false);
    const [searched, setSearched] = React.useState(false);

    const handleScroll = async () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            await dispatch(setOffset(offset + 10));
            handleSearch();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });

    const handleSearch = async () => {
        if (searchTerm !== '') {
            await dispatch(fetchResults());
            setSearched(true);
            dataSource.length === 0 ? setResultWarning(true) : setResultWarning(false);
        } else {
            setError(true);
            setInterval(() => {
                setError(false);
            }, 2500);
        }
    };

    const handleClear = async () => {
        await dispatch(setSearchTerm(''));
        await dispatch(setOffset(0));
        await dispatch(setData([]));
        setSearched(false);
        setResultWarning(false);
    };

    return (
        <Grid spacing={2}>
            <Grid item xs={12}>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: '#E0E0E0',
                        display: 'flex',
                        gridTemplateColumns: { md: '3fr 3fr' },
                        gap: 2
                    }}
                >
                    <TextField fullWidth label="Search" id="fullWidth" value={searchTerm} onChange={(e) => dispatch(setSearchTerm(e.target.value))} />
                    <Button variant="contained" onClick={() => (searched ? handleClear() : handleSearch())}>
                        {searched ? 'Clear' : 'Search'}
                    </Button>
                </Box>
            </Grid>
            {error && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Input can not be empty — <strong>check it out!</strong>
                </Alert>
            )}
            {dataSource.map((item: any) => {
                return <Item key={item.id} title={item.title} artist={item.artist} album={item.album} />;
            })}

            {resultWarning && (
                <Grid container spacing={3}>
                    <Grid item xs></Grid>
                    <Grid item xs>
                        <Typography variant="h5" component="div" style={{ marginTop: 25 }}>
                            Could not find any results
                        </Typography>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default DataContainer;
