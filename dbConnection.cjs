const {MongoClient} = require('mongodb')

let dbConnection
function connectToDb(callBack) {
    //connect to atlas server //
    MongoClient.connect('mongodb+srv://M2024:mohan2024@cluster0.xp64s41.mongodb.net/M2024?retryWrites=true&w=majority').then(function(client){
        dbConnection = client.db()
        callBack()

    }).catch(function(error) {
        callBack(error)
    })


}


function getDb() {
    return dbConnection
}
module.exports = {connectToDb, getDb}



