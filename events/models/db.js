const mongoose=require('mongoose');

mongoose.createConnection('mongodb://localhost/Employeeevents', {useNewUrlParser: true, //database name should be specified
useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("(events)we are connected.YaY!!");
});