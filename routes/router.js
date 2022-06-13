const userRouter = require('./userRoutes.js');
const noteRouter = require('./noteRoutes.js');

const router = (app) => {
    app.get('/', (req, res) => res.send('Hello World'));
    app.use('/api/user', userRouter);
    app.use('/api/note', noteRouter);
};

module.exports = router;
