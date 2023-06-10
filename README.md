# students
SAT Results Management Application
This is a command-line application that allows users to manage SAT results data. 
Users can perform various operations such as inserting data, viewing all data, getting ranks, updating scores, and deleting records.
The application stores the data in memory and provides basic CRUD functionality.

#####Features---------------------------------------
Menu Options:

Insert data - http://localhost:8080/satApp/v1/create
View all data - http://localhost:8080/satApp/v1/findAll
Get rank - http://localhost:8080/satApp/v1/findbyRank
Update score - http://localhost:8080/satApp/v1/update
Delete one record - http://localhost:8080/satApp/v1/delete

======================Request Body==================================
Insert Data:  
Users can input data for the following SAT Results object and store it in memory:
{
"name":"Manoj",
"address":"Sharma",
"city":"ghaziabad",
"country":"india",
"pincode":345678,
"satScore":1000
}
View All Data:

Displays all the data from the memory in JSON format.
Get Rank:

Takes the name as input and returns the rank of the candidate according to the data from the memory.
Update Score:

Allows updating the SAT score for a candidate by name.
Delete One Record:

Deletes a record from the memory based on the name.