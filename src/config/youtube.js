const key = "AIzaSyA6kg-gAdvHEsdlvSG4EcoxMeQYKhySnw8";
const configs = {
    "url": {
        "videoCategory": `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&key=${key}&videoCategoryId=`,
        "search": `https://www.googleapis.com/youtube/v3/search?part=id,snippet&key=${key}&q=`,
    }
};

module.exports = {
    key: key,
    configs: configs,
}