const {user_game} = require("../models");
const {user_game_biodata} = require("../models");
const {user_game_history} = require("../models");


async function loginForm(req, res){
    try {
        // res.send("oalah gini tho");
        res.render('login');
    } catch (error) {
        console.log(error);
    }
}

//check user & pass
async function check(req, res){
    try {
        // let {user, pass} = req.body;
        // let input = {user, pass};
        // console.log(input);
        let user = req.body.user;
        let pass = req.body.pass;
        if(user == "user" && pass == "user"){
            console.log("masuk");
            res.redirect('/dataGamer/viewGame');
        }else{
            console.log("salah");
        }
    } catch (error) {
        console.log(error);
    }
}

//creat data
async function createGame(req, res){
    try {
        let { user_name, nama, usia, kota, password, nama_game_dimainkan, selama } = req.body;
        let input = { user_name, nama, usia, kota, password, nama_game_dimainkan, selama };

        await user_game.create(
            {
                user_name: input.user_name,
                password: input.password
            }
        );

        let user_id = await user_game.findOne({where: {}, order: [['createdAt', 'DESC']]})
        await user_game_biodata.create(
            {          
                user_id: user_id.id,
                nama: input.nama,
                usia: input.usia,
                kota: input.kota
            }
        );
        await user_game_history.create(
            {
                user_id: user_id.id,
                nama_game_dimainkan: input.nama_game_dimainkan,
                selama: input.selama
            }
        );

        console.log(input.user_name);
        console.log(user_id.id);

        res.redirect('/dataGamer/viewGame');
        // res.status(201).json(data); 
    } catch (error) {
        console.log(error);
    }
}

//view Form create
async function formCreate(req, res){
    try {
        res.render('addGame');
    } catch (error) {
        console.log(error);
    }
}

//view all data
async function viewGame(req, res){
    try {
        let data = await user_game.findAll({attributes: ['id', 'user_name', 'password']});
        let bio = await user_game_biodata.findAll({attributes: ['nama', 'usia', 'kota']});
        let history = await user_game_history.findAll({attributes: ['nama_game_dimainkan', 'selama']})

        let long = Object.keys(data);
        let object = [];        

        for(let x = 0; x < long.length; x++){
            object[x] = {
                id: `${data[x]['id']}`,
                user_name: `${data[x]['user_name']}`, 
                nama: `${bio[x]['nama']}`,
                usia: `${bio[x]['usia']}`,
                kota: `${bio[x]['kota']}`,
                password: `${data[x]['password']}`,
                game: `${history[x]['nama_game_dimainkan']}`,
                durasi: `${history[x]['selama']}`
            };
        }
        
        // data.forEach(element => {            
        //     console.log(element.user_name);
        //     console.log(element.password);
        //     console.log("a");
        // });
        // console.log(data[0]['id'])
        // console.log(data[0]['user_name'])
        // console.log(data)

        res.render('home', {object});
        // res.status(200).json(data['user_name']);
    } catch (error) {
        console.log(error);
    }
}


async function viewFormEdit(req, res) {
    try {
        let { id } = req.params;
        let data = await user_game.findAll({attributes: ['id', 'user_name', 'password'], where: {id: id}});
        let bio = await user_game_biodata.findAll({attributes: ['nama', 'usia', 'kota'], where: {user_id: id}});
        let history = await user_game_history.findAll({attributes: ['nama_game_dimainkan', 'selama'], where: {user_id: id}})

        let long = Object.keys(data);
        let object = [];        

        for(let x = 0; x < long.length; x++){
            object[x] = {
                id: `${data[x]['id']}`,
                user_name: `${data[x]['user_name']}`, 
                nama: `${bio[x]['nama']}`,
                usia: `${bio[x]['usia']}`,
                kota: `${bio[x]['kota']}`,
                password: `${data[x]['password']}`,
                game: `${history[x]['nama_game_dimainkan']}`,
                durasi: `${history[x]['selama']}`
            };
        }

        // console.log(long)
        // console.log(object[0]['id']);
        // let data = await user_game.findOne({ where: { id: id } });
        res.render("edit", { object });
    } catch (error) {
        console.log(error);
    }
}

async function updateGame(req, res){
    try {
        let { id } = req.params;
        let { user_name, nama, usia, kota, password, nama_game_dimainkan, selama } = req.body;
        let input = { user_name, nama, usia, kota, password, nama_game_dimainkan, selama };
        console.log(input);
        console.log(id);

        await user_game.update(
            {
                user_name: input.user_name,
                password: input.password
            }, {where: {id: id}} 
        );
        // let user_id = await user_game.findOne({where: {}, order: [['updatedAt', 'DESC']]})
        await user_game_biodata.update(
            {        
                nama: input.nama,
                usia: input.usia,
                kota: input.kota
            }, {where: {user_id: id}}
        );
        await user_game_history.update(
            {
                nama_game_dimainkan: input.nama_game_dimainkan,
                selama: input.selama
            }, {where: {user_id: id}}
        );


        res.redirect("/dataGamer/viewGame");
    } catch (error) {
        console.log(error);
    }
}

//hapus game by id
async function deleteGame(req, res){
    try {
        let {id} = req.params;
        await user_game.destroy({where: {id: id}});
        await user_game_biodata.destroy({where: {user_id: id}});
        await user_game_history.destroy({where: {user_id: id}});
        console.log("hapus id " + id)
        res.redirect("/dataGamer/viewGame");
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    loginForm,
    check,
    createGame,
    viewGame, 
    viewFormEdit,
    updateGame,
    formCreate,
    deleteGame
};