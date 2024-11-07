const express = require('express');
const exphbs =require ('express-handlebars');
const bodyParser =require ('body-parser');

require('dotenv').config();
const app = express();
const fileUpload =require ('express-fileupload');

const port = process.env.PORT || 1000;

app.use(fileUpload());

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('hbs',exphbs.engine({extname:'.hbs'}));
app.set('view engine','hbs');

app.use(express.static('public'));
app.use(express.static('upload'));


const routes= require('./server/routes/user');
app.use('/',routes);


const PostList= require('./server/routes/user');
app.use('/PostList',PostList);

const AboutAS =require('./server/routes/user');
app.use('/AboutAS',AboutAS);

const Login =require('./server/routes/user');
app.use('/Login',Login);

const Contact =require('./server/routes/user');
app.use('/Contact',Contact);

const AdminSpaceConnect =require('./server/routes/user');
app.use('/AdminSpaceConnect',AdminSpaceConnect);

const AddPost =require('./server/routes/user');
app.use('/AddPost',AddPost);


app.listen(port,() => console.log('Le Port est : ',port));
