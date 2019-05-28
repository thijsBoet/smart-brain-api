const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9ff263120b1e42e9ba17f79bc43dd815'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to fetch API'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(...entries);
        })
    .catch(err => res.status(400).json('Not able to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}