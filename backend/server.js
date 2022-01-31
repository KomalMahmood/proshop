import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
// import Products from './Data/products.js';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import {notFound,errorHandler} from './middleware/errorMiddleware.js';
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from 'path';
import uploadRoutes from "./routes/uploadRoutes.js";
import morgan from 'morgan';


connectDB();
const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
};

app.use(express.json());


// displayed on localhost 5000
// app.get('/',(req,res)=>{
//     console.log('Api is running');
//     res.send('Api is running');
// });


app.use("/api/products",productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);



app.get("/api/config/paypal", (req, res) =>{
    res.send(process.env.PAYPAL_CLIENT_ID);
   });

   const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

   if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
   } else {
    app.get('/', (req, res) => {
    res.send('API is running....')
    })
   }

app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT || 5000;
//displayed when server run in terminal
app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode and on port ${PORT}`.yellow.bold);
});




