import jwt from "jsonwebtoken";

// jwt components 
// header => algorithm + type
// payload => user info , id ,name, token id ,when expired etc explanation
// signature => secret key

const generateToken = (id)=>{

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    // payload containig user info here uaser id from db

    return jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: '30d'});
};

export default generateToken;