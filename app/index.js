const express=require('express');
const app=express();
const port=3000;

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static(__dirname + '/views'));
const Middleware =(req, res, next)=>{
    var date=new Date();
    var day=date.getDay();
    var hours=date.getHours();
    if((hours<=17 && hours>=9)&& (day>=1 && day<=5) ){
        let url = req.url.replace("/", "");
        if(!url) {res.render('home')}
        else {res.render(url)}
    }
    else {res.render('notAvailable')}
    next();
} 
app.use(Middleware);

app.get('/home',(req,res,next) =>{
    res.render('home')
    next()
});
app.get('/ourServices',(req, res)=>{
    res.render('ourServices')
    next()
});
app.get('/contactUs',(req, res)=>{res.render('contactUs')});
app.listen(port,()=>{console.log('The server is running, ' +' please, open your browser at http://localhost:%s',port)});