const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    
    await sequelize.sync({ alter: false });
    console.log('Modelos sincronizados');
    
  } catch (err) {
    console.error('Error de base de datos:', err.message);
    console.log('El servidor iniciará sin conexión a la base de datos');
  }

  app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto', PORT);
  });
}

start();