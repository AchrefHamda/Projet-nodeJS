const express =require('express');
const routes =express.Router();
const usercontrol =require('../controles/usercontrol');


//GET
routes.get('/',usercontrol.home);
routes.get('/Login',usercontrol.Login);
routes.get('/Contact',usercontrol.Contact);
routes.get('/AboutAS',usercontrol.AboutAS);
routes.get('/AdminSpaceConnect',usercontrol.view);
routes.get('/PostList',usercontrol.PostList);
routes.get('/AddPost',usercontrol.AddPost);
routes.get('/contactClient/:id', usercontrol.contactClient);
routes.get('/editpost/:id', usercontrol.edit);
routes.get('/ContactAff',usercontrol.ContactAff);
routes.get('/viewpost/:id', usercontrol.viewall);
routes.get('/:id', usercontrol.delete);
routes.get('/viewMessage/:id', usercontrol.viewmsg);
//POST
routes.post('/',usercontrol.home);
routes.post('/AdminSpaceBase',usercontrol.AdminSpaceBase);
routes.post('/AdminSpaceConnect',usercontrol.find1);
routes.post('/AddPost',usercontrol.AddPostBase);
routes.post('/editpost/:id', usercontrol.update);
routes.post('/contactClient/:id', usercontrol.contactClient);
routes.post('/ContactB',usercontrol.ContactB);
routes.post('/ContactAff',usercontrol.ContactAff);
routes.post('/PostList',usercontrol.find2);
routes.post('/ContactSearch',usercontrol.find3);
routes.post('/home',usercontrol.find4);







module.exports=routes;