import bcrypt from 'bcryptjs';

const users = [
    {
    name: "Admin User",
    email:"admin@example.com",
    password: bcrypt.hashSync("123456",10), // encrypt by default to 10 characters and max are 32.... 
    isAdmin: true,
},
{
    name: "Ayesha Khurram",
    email:"aysh@example.com",
    password: bcrypt.hashSync("123456",10),
    
},
{
    name: "Ali ahmed",
    email:"ali@example.com",
    password: bcrypt.hashSync("123456",10),

},  
];

export default users;