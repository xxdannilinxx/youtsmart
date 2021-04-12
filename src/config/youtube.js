const key = ""; // ou nas variaveis de ambiente
const configs = {
    "url": {
        "videoCategory": `https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&maxResults=3&regionCode=BR&key=${key}&videoCategoryId=`,
        "search": `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=9&regionCode=BR&key=${key}&q=`,
        "getInfo": `https://www.googleapis.com/youtube/v3/videos?part=id,snippet&regionCode=BR&key=${key}&id=`,
    }
};

module.exports = {
    key: key,
    configs: configs,
}