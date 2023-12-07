const express = require('express');
const userRoutes = require('./routes/user.route');
const articleRoutes = require('./routes/article.route');
const eventRoutes = require('./routes/event.route');
const clubRoutes = require('./routes/club.route');
const participationRoutes = require('./routes/participation.route');
const userClubRoutes = require('./routes/userClub.route');
const cors = require('cors');

const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);
app.use('/events', eventRoutes);
app.use('/clubs', clubRoutes);
app.use('/participations', participationRoutes);
app.use('/userClubs', userClubRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});