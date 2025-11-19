const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const feedbackRoutes = require('./routes/feedbackRoutes');
const workRoutes = require('./routes/workRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const LoginRoute = require('./routes/LoginRoute');
const adminRoute = require('./routes/adminRoute');
const path = require('path');
const ourService = require('./routes/ourServiceRoutes');
const FQ = require('./routes/FQ-Routes');

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.APPLICATION_URL,  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
console.log("CORS Configured for:", process.env.APPLICATION_URL);
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDb connected sucessfully");
}).catch((e)=>{
       console.log("DataBase Connection failed:",e);
});


app.use('/api/feedback', feedbackRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/products',productRoutes);
app.use('/api/works', workRoutes);
app.use('/api/Service', ourService);
app.use('/api/FQ', FQ);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/login',LoginRoute);
app.use('/api/admin',adminRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
}
);