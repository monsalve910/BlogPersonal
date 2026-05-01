const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;

async function start() {
  try {
     await sequelize.sync();
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log('Server running on port', PORT);
    });
  } catch (err) {
    console.error('DB connection error:', err);
  }
}
start();