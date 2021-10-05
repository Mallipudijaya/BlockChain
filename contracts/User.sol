pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;



contract User {
    
   struct user{
      string name;
      string addr;
      uint256 phno;
      uint256 userId;
   }
   user[] public users;
   uint256 public totalUsers;
  
    constructor() public {
   
       totalUsers=0;
   }

   
   event UserUpdated(uint256  id, string addr);
   
event UserEvent (string userName,string addr, uint256 phno,uint256 id);
   
   
   function insert( string memory userName , string memory addr , uint256  phno,uint256  id) public returns (uint256 totalUser){
        user memory newUser = user(userName , addr, phno,id);
        
        users.push(newUser);
        totalUsers++;
        emit UserEvent (userName, addr, phno,id);
        return totalUsers;
   }
   
  
     function updateUser(uint256  id, string memory addr) public returns (bool success){
       for(uint256 i =0; i< totalUsers; i++){
           if(users[i].userId==id){
             users[i].addr = addr;
              emit UserUpdated(id, addr);
              return true;
           }
       }
       return false;
   }
  

   function getUserID(uint256  userid) public view returns(string memory userName,string memory addr, uint256 phno,uint256 id){
        for(uint256 i =0; i< totalUsers; i++){
           if(users[i].userId ==userid){
              
              return (users[i].name , users[i].addr , users[i].phno,users[i].userId);
           }
       }
       revert('user not found');
   }   
      function getAllUsers() public view returns (user[] memory)
    {    
           
         return (users);
           
       
    }

   function compareStrings(string memory a, string memory b) internal pure  returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
}
   
    function getTotalUsers() public view returns (uint256 length){
      return users.length;
   }

    function append(string memory a, string memory b) internal pure returns (string memory) {

    return string(abi.encodePacked(a,"  ", b));

}
}