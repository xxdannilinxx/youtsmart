import React from 'react'

import HeaderComponent from '../components/SharedComponents/Header';
import SearchComponent from '../components/SharedComponents/Search';
import FooterComponent from '../components/SharedComponents/Footer';
import ListVideosComponent from '../components/Videos/List';

import axios from 'axios';

export default function Home(props) {
    const [loading, setLoading] = React.useState(true);
    const [videos, setVideos] = React.useState([]);

    function getVideos() {
        axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&key=AIzaSyDdSgKJobBT5OdAnZSPLgbyL1ZrfY_Jy5k')
            .then(res => {
                let items = [];
                res.data.items.map(snippet => {
                    items.push({
                        title: snippet.title,
                    });
                });
                setVideos(items);
                console.log(res);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            })
    }
    getVideos();

    return (
        <React.Fragment>
            <HeaderComponent />
            <SearchComponent />
            <ListVideosComponent videos={videos} loading={loading} />
            <FooterComponent />
        </React.Fragment >
    );
};