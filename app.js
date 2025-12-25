const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// routes 
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Phone API' });
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 8080;

sequelize.authenticate()
    .then(() => {
        console.log("connected to the database successfully.");
        return sequelize.sync({alter: true});
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server is running on port ' + PORT);
        })
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
