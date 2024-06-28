const mongoose = require('mongoose');

const uri = 'mongodb+srv://Oleks:freedom2023@atlascluster.e88hnna.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Успішно підключено до MongoDB'))
    .catch((e) => console.log('Підключення до MongoDB не вдалося', e));

module.exports = mongoose;
