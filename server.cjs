// tools import
const express = require('express')
const bodyParser = require('body-parser')

// object id defined here
const {ObjectId} = require('mongodb')


// Importing required functions from dbConnection.cjs
const {connectToDb, getDb} = require('./dbConnection.cjs')


// create express app using body parser
const app = express()
app.use(bodyParser.json())


// Database connection 
let db
connectToDb(function(error) {
    if(error) {
        console.log('Could not establish connection...')
        console.log(error) 
    } else { // if no error in establishing connection
        app.listen(8000)
        db = getDb()
        console.log('Listening on port 8000...')
    }
})

/**
 * Expense Tracker
 * Functionalities : adding entry, getting the summaries of previous entries, editing and deleting
 * Input fields : Category, Amount, Date
 * 
 * CRUD : Create, Read, Update and Delete
 * 
 * get-entries / get-data - GET
 * add-entry - POST
 * edit-entry - PATCH
 * delete-entry - DELETE
 */


//------------>> POST REQUEST <<----------------------------------------------------------------------------------------//
// // It defines application routes
// app.post('/add-entry', function(request, response) {
//     // handle the add entry route
//     db.collection('ExpensesData').insertOne(request.body).then(function() {
//         response.status(201).json({
//             "status" : "Entry added successfully"
//         })
//     }).catch(function () {
//         response.status(500).json({
//             "status" : "Entry not added"
//         })
//     })
// })





// ----------------------->> DAY 11 <<------------------------------------------------------------------------------------------------------//

// GET REQUEST

app.get('/get-entries', function(request, response) {
    // Declaring an empty array
    const entries = []
    db.collection('ExpensesData')
    .find()
    .forEach(entry => entries.push(entry))
    .then(function() {
        response.status(200).json(entries)
    }).catch(function() {
        response.status(404).json({
            "status" : "Could not fetch documents"
        })
    })
})








// DELETE REQUEST 

app.delete('/delete-entry', function(request, response) {
    if(ObjectId.isValid(request.query.id)) {
        db.collection('ExpensesData').deleteOne({
            _id : new ObjectId(request.query.id)
        }).then(function() {
            response.status(200).json({
                "status" : "Entry successfully deleted"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Entry not deleted"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})



//PARAMS 
// using body or using cmd


app.patch('/update-entry/:id', function(request, response) {
    if(ObjectId.isValid(request.params.id)) {
        db.collection('ExpensesData').updateOne(
            { _id : new ObjectId(request.params.id) }, // identifier : selecting the document which we are going to update
            { $set : request.body } // The data to be updated
        ).then(function() {
            response.status(200).json({
                "status" : "Entry updated successfully"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Unsuccessful on updating the entry"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})


// Connecting on through Atlas