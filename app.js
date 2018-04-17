let express = require('express');
let fs = require('fs');
let path = require('path');
let app = express();
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.get('/', function (req, res) {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        let users = JSON.parse(data);
        let userInfos = [];
        for (let uid in users) {
            userInfos.push(users[uid]);
        }
        userInfos.sort((a, b) => b.totalViewsCount - a.totalViewsCount);
        res.render('index', { userInfos });
    });

});
var {execFile} = require('child_process');
var cronJob = require('cron').CronJob;
var job = new cronJob('* * * * * ',function(){
    console.log('start');
    var update = execFile('node',[path.join(__dirname,'./crawl.js')]);
});
job.start();
app.listen(9999);