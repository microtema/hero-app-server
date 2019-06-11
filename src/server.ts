import app from './app';

const port = 5000;

app.listen(port, (err) => {

    if (err) {

        return console.error(err);
    }

    return console.log(`server is listening on ${port}`);
});
