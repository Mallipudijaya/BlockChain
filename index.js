const express = require('express');
const ethers = require('ethers');
const app = express();
app.use(express.json())
const Web3 = require("web3");
const web3=new Web3("http://localhost:7545" );
const PORT = process.env.PORT || 8000;
/*const id=web3.eth.net.getId();
const contractaddr=require('./build/contracts/CRUD.json')
const contractAddress = contractaddr.networks[id].address
console.log(contractAddress+"!");*/
const User=require('./build/contracts/User.json')
const contractAddress = '0x133d5c15661d128FF5dB5F2451A3E37F84590AfD'
const abiArray=require("./abi.json");
var contract =new web3.eth.Contract(User.abi,contractAddress);
app.get('/users', async (req, res) => {
    try {
         contract.methods.getAllUsers().call().then(users=>
             console.log(JSON.stringify(users)));
        res.send("view");
    } catch (e) {
        res.send(e)
    }
})
app.get('/totusers', async (req, res) => {
    try {
         contract.methods.getTotalUsers().call().then(tot=>
             console.log(tot));
        res.json("view");
    } catch (e) {
        res.send(e)
    }
})
app.post('/users', async (req, res) => {
   console.log(req.body);
    try {
        contract.methods.insert(req.body.userName,req.body.addr,req.body.phno,req.body.id).send({
        from:'0xf0118a7b65e51397025388cF47ecF34De9bC80Ef',
        gasPrice: '10000000000000',
        gas: 1000000
        })
       .then(count=>
           console.log(count));
        res.send("inserted");
    } catch (e) {
        res.send(e)
    }
})
app.post('/update', async (req, res) => {
    console.log(req.body);
     try {
         contract.methods.updateUser(req.body.id,req.body.addr).send({
         from:'0xf0118a7b65e51397025388cF47ecF34De9bC80Ef',
         gasPrice: '10000000000',
         gas: 1000000
         })
        .then(
            count=>
            console.log(count+"!"));
         res.send("updated");
     } catch (e) {
         res.send(e)
     }
 })
app.get('/:id', async (req, res) => {
   console.log(req.body);
    try {
        contract.methods.getUserID(req.params.id).call()
       .then(user=>
           console.log(JSON.stringify(user)));
        res.send("id");
    } catch (e) {
        res.send(e);
    }
})
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + PORT + '/api');
});


app.listen(PORT, () => {
    console.log('Server started')
})