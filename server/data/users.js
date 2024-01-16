import bcrypt from "bcryptjs";


const users = [
    {
        name: "Avazbek",
        email: "marshil1995@gmail.com",
        password: bcrypt.hashSync("Avazbek1995", 10),
        isAdmin:true
    },
    {
        name: "Laylo",
        email: "laylo@gmail.com",
        password: bcrypt.hashSync("Avazbek1995", 10),
        
    }
];

export default users;