const app = require('./app');
require('dotenv').config();

if (!process.env.PORT) {
    throw new Error('La variable de entorno PORT es requerida.');
}

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
