
const Web3 = require("web3");

const init1=async()=>{
const web3=new Web3("http://localhost:7545" );
const acc = await web3.eth.getAccounts();
console.log(acc[0]);
web3.eth.sendTransaction({from: acc[0],to: acc[1], value: web3.utils.toWei("1", "ether")})
}
init1();
