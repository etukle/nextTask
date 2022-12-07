import React from 'react';
import { Alert, AlertTitle, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { setData, fetchResults } from '../redux/siteSlice';
import { setSearchBox, setSearchTerm, setOffset } from '../redux/searchSlice';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import InfiniteScroll from 'react-infinite-scroll-component';

const DataContainer = () => {
    const dispatch = useDispatch<any>();
    const dataSource = useSelector((state: any) => state.siteData.site.data);
    const searchBoxText = useSelector((state: any) => state.searchData.site.searchBox);
    const searchTerm = useSelector((state: any) => state.searchData.site.searchTerm);

    const [error, setError] = React.useState(false);

    const handleSearch = async () => {
        if (searchBoxText !== '') {
            await dispatch(setData([]));
            await dispatch(setSearchTerm(searchBoxText));
            await dispatch(fetchResults());
        } else {
            setError(true);
            setInterval(() => {
                setError(false);
            }, 3000);
        }
    };

    const handleClear = async () => {
        await dispatch(setSearchBox(''));
        await dispatch(setSearchTerm(''));
        await dispatch(setOffset(0));
        await dispatch(setData([]));
    };

    const loadFunc = async () => {
        await dispatch(fetchResults());
    };
    return (
        <div>
            <div style={{ position: 'fixed', left: 0, right: 0, top: 0 }}>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: '#E0E0E0',
                        display: 'flex',
                        gridTemplateColumns: { md: '3fr 3fr' },
                        gap: 2
                    }}
                >
                    <TextField fullWidth label="Search" id="fullWidth" value={searchBoxText} onChange={(e) => dispatch(setSearchBox(e.target.value))} />
                    <Button variant="contained" onClick={() => handleSearch()}>
                        Search
                    </Button>
                    <Button variant="contained" onClick={() => handleClear()}>
                        Clear
                    </Button>
                </Box>
            </div>
            {error && (
                <div style={{ marginTop: 90 }}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Input can not be empty — <strong>check it out!</strong>
                    </Alert>
                </div>
            )}
            <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', marginTop: 100, marginBottom: 50 }}>
                <InfiniteScroll
                    dataLength={dataSource.length} //This is important field to render the next data
                    next={loadFunc}
                    hasMore={true}
                    loader={<></>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {dataSource.map((item: any) => {
                        return (
                            <Container>
                                <Item key={item.id} title={item.title} artist={item.artist} album={item.album} />
                            </Container>
                        );
                    })}
                </InfiniteScroll>
            </div>
            {/* {resultWarning && (
                <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5" component="div" style={{ marginTop: 25 }}>
                        Could not find any results
                    </Typography>
                </div>
            )} */}
        </div>
    );
};

export default DataContainer;
