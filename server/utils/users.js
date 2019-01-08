/*
  users.js
  This will be a class to controll all the user functions and user data
*/

class Users{
  constructor(){
    this.users = [];
  }

  //add user methoud

  addUser (id,room,name){
    console.log(name);
    var user = {id,room,name};
    this.users.push(user);
    return user;
  }

  removeUser(id){
      // return removed user;
      var user = this.getUser(id);
      if (user) {
        var filteredItems = this.users.filter(item => item.id !== id);
        this.users = filteredItems;
        return filteredItems;
      }

  }

  getUserbyNmae(name){
    var user = this.users.filter(item => item.name === name)[0];
    return user;
  }

  getUser(id){
    //return the found user;
    var user = this.users.filter(item => item.id === id)[0];
    return user;
  }

  getUserList(room){
    //return user[];
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    console.log(namesArray);
    return namesArray;

  }

  //
}

module.exports = {Users};
