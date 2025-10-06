const app = require('./app');

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});