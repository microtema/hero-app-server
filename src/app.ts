import cors from 'cors';
import express from 'express';
import query from 'qs-middleware';

const app = express();

app.use(query());
app.use(cors());

app.get('/', (req, res) => {

    res.send('The sedulous hyena ate the antelope!');
});

export default app;
