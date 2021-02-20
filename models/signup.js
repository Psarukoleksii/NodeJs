const path = require('path');
const fs = require('fs');
const { join } = require('path');

class SignUp {
    constructor(email, password, firstName, lastName){
        this.id = new Date().getTime();
        this.email = email,
        this.password = password,
        this.firstName = firstName,
        this.lastName = lastName
    }

    //  helper function

    oneUser(){
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName
        }
    }


    async save(){
        const users = await SignUp.getAll();
        users.push(this.oneUser());

        return new Promise((resolve, reject)=>{
            fs.writeFile(path.join(__dirname, '..', 'data', 'allUsers.json'),
            JSON.stringify(users),
            (err)=>{
                if(err) reject(err);
                resolve()
            }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject)=>{
            fs.readFile(path.join(__dirname, '..', 'data', 'allUsers.json'),
            'utf-8',
            (err, data) =>{
                if(err) reject(err)
                resolve(JSON.parse(data))
            }
        )})
    }
}

module.exports = SignUp;