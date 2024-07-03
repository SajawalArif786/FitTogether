const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./HelpingFunctions/database");
const path = require('path');
require("dotenv").config()
require('express-async-errors');

// create express app
const app = express();

// const corsOptions = {
//   origin: ["https://uhcstock.com", "http://192.168.100.5:3000", "https://admin.uhcstock.com", "http://localhost:3000", "http://localhost:3001"],
//   optionsSuccessStatus: 200,
// };

//app.use(cors(corsOptions));

//app.options('*', cors(corsOptions));

// Increase request size limit to 5MB
app.use(bodyParser.json({ limit: '25mb' }));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//SocketIO
// const http = require("http").Server(app);
// const io = require("socket.io")(http);



//Routes
const AuthRoutes = require('./routes/auth');
// const ProductRoutes = require('./routes/product');
// const ChatRoutes = require('./routes/chat')
// const MessageRoutes = require('./routes/message')
// const AdminRoutes = require('./routes/admin')
// const OrderRoutes = require('./routes/order')
// const PaymentRoutes = require('./routes/payment')
// const SystemSettingRoutes = require('./routes/systemSetting')

app.use(express.json());

app.use('/user', AuthRoutes)

// app.use('/api/product', ProductRoutes)

// app.use('/api/chat', ChatRoutes)

// app.use('/api/message', MessageRoutes)

// app.use('/api/admin', AdminRoutes)

// app.use('/api/order', OrderRoutes)

// app.use('/api/payment', PaymentRoutes)

// app.use('/api/systemSetting', SystemSettingRoutes)

app.get('/', (req, res) => {
    res.send('Hey Got you')
})
//MiddleWare

//error handler

const notFoundMiddleware = require('./middleware/not-found');
const errorhandlerFunc = require('./middleware/error-handler');

app.use(notFoundMiddleware);

app.use(errorhandlerFunc);

const port = process.env.PORT || 4001;

app.listen(port, async () => {
    await DB(process.env.MONGO_URI);
    console.log(`Server is listening on port ${port}`);
});
