const youtube = require('../src/config/youtube');

test('check youtube api key exists', () => {
    const { key } = youtube;
    expect(key).not.toBeNull();
});