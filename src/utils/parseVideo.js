import moment from 'moment';

export default function parseVideo(item) {
    return {
        id: (typeof item.id === 'object' ? item.id.videoId : item.id),
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        date: moment(item.snippet.publishedAt).format('DD/MM/YYYY') + ' às ' + moment(item.snippet.publishedAt).format('HH:mm'),
        image: item.snippet.thumbnails.high.url,
    };
}