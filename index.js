require('dotenv').config();


const express = require('express');
const app = express();

app.use(express.json());

app.use('/dashboard', express.static('dashboard'));

app.get('/health', (req,res) => {
    res.json({status: 'ok', time: new Date().toISOString() })
} )


app.get('/test', (req,res) => {
    res.json({
        message: 'Express is running',
        env_loaded: !!process.env.ADMIN_SECRET
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
