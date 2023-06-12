const mongoose = require('mongoose')

const database = 'gymDB'

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://127.0.0.1/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`Established a Database CommLink Sync with the Rebel Base: ${database}`))
.catch(err => console.log("This is not da way", err))