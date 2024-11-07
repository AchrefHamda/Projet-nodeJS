const mysql =require('mysql');






//EXPORTATION DES PAGES 
exports.AboutAS=('AboutAS',(req,res) =>{
    res.render('AboutAS');
});

exports.Login=('Login',(req,res) =>{
    res.render('Login');
});
exports.Contact=('Contact',(req,res) =>{
    res.render('Contact');
});
exports.ASC=('AdminSpaceConnect',(req,res) =>{
    res.render('AdminSpaceConnect');
});
exports.home=('/',(req,res)=>{
    res.render('home');
});
exports.PostList=('PostList',(req,res) =>{
    res.render('PostList');
});
exports.AddPost=(req,res)=>{
    res.render('AddPost');
}

exports.ContactAff=(req,res)=>{
    res.render('ContactAff');
}
// APPELLE DE BASE
const pool =mysql.createPool({
    connectionLimit :100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME 
});
//Verifier la connextion de base avant les action
pool.getConnection((err, connection) => {
    if (err) {
        console.error(err); 
    }else{
    console.log("connextion recu , id : "+connection.threadId);}
    });

// AFFICHAGE DE BASE D'UTILISATEURS
exports.view=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM admin',(err ,Resultat)=>{
        connection.release();
        if (!err) {
            res.render('AdminSpaceConnect',{Resultat});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat);

    });
});
};
// AFFICHAGE DE BASE DE PUBLICATION
exports.PostList=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM publication',(err ,Resultat2)=>{
        connection.release();
        if (!err) {
            res.render('PostList',{Resultat2});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat2);

    });
});
};

//BUTTON SEARCH USER////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.find1=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    let searchT = req.body.search;
    connection.query('SELECT * FROM admin WHERE nom LIKE ? OR prenom LIKE ?',['%'+searchT+'%','%'+searchT+'%'],(err ,Resultat)=>{
        connection.release();
        if (!err) {
            res.render('AdminSpaceConnect',{Resultat});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat);
    });
});
};
//BUTTON SEARCH POST
exports.find2=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    let searchPost = req.body.searchPost;
    connection.query('SELECT * FROM publication WHERE nom_U LIKE ? ',['%'+searchPost+'%'],(err ,Resultat2)=>{
        connection.release();
        if (!err) {
            res.render('PostList',{Resultat2});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat2);
    });
});
};
exports.find3=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    let searchContact = req.body.searchContact;
    connection.query('SELECT * FROM contact WHERE nom LIKE ? OR prenom LIKE ?',['%'+searchContact+'%','%'+searchContact+'%'],(err ,Resultat7)=>{
        connection.release();
        if (!err) {
            res.render('ContactAff',{Resultat7});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat7);
    });
});
};
exports.find4=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
        let searchPostHome = req.body.searchPostHome;
        connection.query('SELECT * FROM publication WHERE titre LIKE ? OR Nom_U LIKE ?',['%'+searchPostHome+'%','%'+searchPostHome+'%'],(err ,Resultat4)=>{
            connection.release();
            if (!err) {
                res.render('home',{Resultat4});
            }else{
                console.log("Erreur",err);
            }
            console.log("en utilise tableaux : \n",Resultat4);
        });
    });
};
//LOGIN FORM
exports.AdminSpaceBase=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    const email = req.body.email;
    const password = req.body.Pass;
    connection.query('SELECT * FROM admin WHERE email = ? AND motdp = ?',[email,password],(err ,Resultat)=>{
        connection.release();
        if (Resultat.length > 0) {
            res.render('AdminSpaceConnect', { Resultat });}
        else{
            res.render('login', { erreur: 'Incorrect login' });  
        }      
        if (err) {
            console.log("erreur",err);
        }
    });
});
};
// Add Post Base
exports.AddPostBase=(req,res)=>{
    let photo;
    let UploadPath;
    if (!req.files || Object.keys(req.files).length == 0) {
        return console.log(err);
    }
    photo= req.files.photo;
    UploadPath ='C:/Users/achre/OneDrive/Bureau/Stage 2eme/Projet/public/css/upload/'+photo.name ;
    console.log(photo);
    photo.mv(UploadPath,function(err){
        if (err) return res.send(err); 

        //add POST
    pool.getConnection((err, connection) => {
            if (err) {                                                                                                  
                console.error(err); 
            }else{
                console.log("connextion recu , id : "+connection.threadId);
        }
    const title = req.body.title;
    const Desc = req.body.Desc;
    const UserName =req.body.UserName;
    const Tel =req.body.Tel;
    const email =req.body.email;
    const Ville =req.body.Ville;

        console.log(photo);
        connection.query('INSERT INTO publication SET  nom_U=? , titre = ? ,description= ? , Photo = ? , Tel =?,email=? ,Ville=?' ,[UserName,title,Desc,photo.name,Tel,email,Ville],(err ,Resultat)=>{
            connection.release();
            if (err) {
                console.log("erreur",err);
            }else{
                res.render('AddPost', {alert : 'The post has been published successfully '});  

            }
        });
    });});
    // Afcihage
    
};



//Afficher les publication ajouter par l'admin
exports.home=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM publication',(err ,Resultat4)=>{
        connection.release();
        if (!err) {
            res.render('home',{Resultat4});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat4);
    });
});


}




//EDIT POST
exports.edit=(req,res) =>{

    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM publication where id =?',[req.params.id],(err ,Resultat5)=>{
        connection.release();
        if (!err) {
            res.render('edit-post.hbs',{Resultat5});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat5);

    });
});
      
      
}



// CONTACT OWNER
exports.contactClient=(req,res) =>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM publication  where id =?',[req.params.id],(err ,Resultat4)=>{
        connection.release();
        if (!err) {
            res.render('ContactClient',{Resultat4});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat4);

    });
});
      
      
}

//CONTACT FORM INSERT
exports.ContactB=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {                                                                                                  
            console.error(err); 
        }else{
            console.log("connextion recu , id : "+connection.threadId);
    }
const nom = req.body.nom;
const prenom=req.body.prenom;
const Nom_U=req.body.Nom_U;
const email =req.body.email;
const Tel=req.body.Tel;
const Ville=req.body.Ville;
const Comment=req.body.Comment;
    connection.query('INSERT INTO contact SET  nom = ? , prenom = ? ,Nom_U= ? , email = ? , Tel =?,Ville=? ,Comment=?' ,[nom,prenom,Nom_U,email,Tel,Ville,Comment],(err ,Resultat)=>{
        connection.release();
        if (err) {
            console.log("erreur",err);
        }else{
            res.render('Contact',{alert :'message sent successfully '});
        }
    });
});};
//AFFICHAGE LES MESSAGES
exports.ContactAff=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM contact',(err ,Resultat7)=>{
        connection.release();
        if (!err) {
            res.render('ContactAff',{Resultat7});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat7);

    });
});
};
//update user
exports.update=(req,res) =>{
    const title = req.body.title;
    const Desc = req.body.Desc;
    const UserName =req.body.UserName;
    const Tel =req.body.Tel;
    const email =req.body.email;
    const Ville =req.body.Ville;
        pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('UPDATE publication SET  nom_U=? , titre = ? ,description= ? ,Tel =?,email=?,Ville=?  WHERE id =?',[UserName,title,Desc,Tel,email,Ville,req.params.id],(err ,Resultat5)=>{
        connection.release();
        if (!err) {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.error(err); 
                }else{
                console.log("connextion recu , id : "+connection.threadId);
            }
            connection.query('SELECT * FROM publication where id =?',[req.params.id],(err ,Resultat5)=>{
                connection.release();
                if (!err) {
                    res.render('edit-post',{Resultat5 ,alert : 'updated'});
                }else{
                    console.log("Erreur",err);
                }
                console.log("en utilise tableaux : \n",Resultat5);
        
            });
        });
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat5);
    });
});
      
      
}


//DELETE POST
exports.delete=('/PostList',(req,res)=>{
    
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('DELETE FROM publication where id = ?',[req.params.id],(err ,Resultat5)=>{
        connection.release();
        if (!err) {
            res.redirect('/PostList');
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat5);

    });
});
})
//VIEW POST
exports.viewall=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM publication WHERE id =?',[req.params.id],(err ,Resultat4)=>{
        connection.release();
        if (!err) {
            res.render('view-post',{Resultat4});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat4);

    });
});
}

exports.viewmsg=(req,res)=>{
    res.render("View-Message");
}
//VIEW MESSAGES 
exports.viewmsg=(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('SELECT * FROM contact WHERE id=?',[req.params.id],(err ,Resultat7)=>{
        connection.release();
        if (!err) {
            res.render('View-Message',{Resultat7});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat7);

    });
});
}
//DELETE MSG 
/*exports.deleteMsg=('/ContactAff',(req,res)=>{
    
    pool.getConnection((err, connection) => {
        if (err) {
            console.error(err); 
        }else{
        console.log("connextion recu , id : "+connection.threadId);
    }
    connection.query('DELETE FROM contact where id =?',[req.params.id],(err ,Resultat7)=>{
        connection.release();
        if (!err) {
            res.render('ContactAff',{Resultat7});
        }else{
            console.log("Erreur",err);
        }
        console.log("en utilise tableaux : \n",Resultat7);

    });
});
});*/