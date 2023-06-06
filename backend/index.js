import express  from 'express'
import mysql from 'mysql'
import cors from "cors"

const app = express()


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "11111",
    database: "test"
})

app.use(cors())

app.get("/",(req,res)=>{
    res.json("привет это сервер который ты создал")
})

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '11111'
app.get("/books", (req,res)=>{
    const q ="SELECT * FROM books"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{
    const q ="INSERT INTO books(`title`,`desk`,`cover`,`price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desk,
        req.body.cover,
        req.body.price,
    ]
    db.query(q, [values], (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("Соединение с backend!")
}
)