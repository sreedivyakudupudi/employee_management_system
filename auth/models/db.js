const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/EmployeeAuthentication', {useNewUrlParser: true, //database name should be specified
useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we are connected.YaY!!");
});