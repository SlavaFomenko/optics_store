const express = require('express');
const db = require('mysql2')
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const connection = db.createConnection({
    host: 'localhost', // Укажите ваш хост базы данных
    user: 'root',
    password: 'FomenkoViacheslav909011',
    database: 'OSO',
});

connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } else {
        console.log('Подключение к базе данных успешно');
    }
});


const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static('public'));

const imageDir = path.join(__dirname, './uploads');

app.post('/check/user/validate',(req, res)=>{
    const data = req.body
    console.log(data)

    const sqlQuery = 'SELECT * from Customers';

    connection.query(sqlQuery,(err, result, fields)=>{
        if(err){
            console.log(err)
            res.json({ status: 'err', message: err });
        }
        let user = null
        result.forEach(u=>{
            if(data.login === u.customer_id && data.password === u.password){
                // console.log(u)
                user = u
            }
        })
        if(user){
            res.json({ status: 'success', message: 'This user exists in the database', user:user});
        } else {
            res.json({ status: 'faild', message: 'This user does not exist in the database' });
        }
    })
})






app.get('/get_image', (req, res) => {
    const imageName = '1.jpg';
    const imagePath = path.join(imageDir, imageName);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('404')
            res.status(404).send('Image not found');
        } else {
            console.log('done')
            console.log(imagePath)
            res.sendFile(imagePath);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
