import cors from 'cors';
import environment from 'custom-env';
import express from 'express';
import query from 'qs-middleware';

// use the current environment at top level
environment.env(true);

const app = express();

app.use(query());
app.use(cors());

app.get('/', (req, res) => {

    res.send('The sedulous hyena ate the antelope!');
});

export default app;
