var mongoServiceName = process.env.DATABASE_SERVICE_NAME,
    mongoHost = 'mongodb',
    mongoPort = '27017',
    mongoDatabase = process.env.MONGODB_DATABASE,
    mongoPassword = process.env.MONGODB_PASSWORD,
    mongoUser = process.env.MONGODB_USER;

if (process.env.DATABASE_SERVICE_NAME) {
  var mongodburl = mongoHost + '://' + mongoUser + ':' + mongoPassword + '@' + mongoServiceName +':' + mongoPort + '/' + mongoDatabase;
} else {
  var mongodburl = 'mongodb://testuser1:mountain1@127.0.0.1:27017/sampledb';
}

console.log(mongodburl)



module.exports = {
        url : mongodburl
    };
