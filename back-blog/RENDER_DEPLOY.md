# Instrucciones para desplegar en Render

## Pasos previos

1. Asegúrate de que todos los cambios estén en tu repositorio de GitHub/GitLab
2. Crea una base de datos MySQL en un servicio como:
   - [Clever Cloud](https://www.clever-cloud.com/) (tiene plan gratuito)
   - [PlanetScale](https://planetscale.com/) (plan gratuito disponible)
   - [Railway](https://railway.app/) (tiene plan gratuito)
   - O cualquier proveedor de MySQL compatible

## Configuración en Render

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Click en "New +" y selecciona "Web Service"
3. Conecta tu repositorio de GitHub/GitLab
4. Configura el servicio:
   - **Name**: back-blog (o el nombre que prefieras)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. En la sección "Environment Variables", agrega:
   - `NODE_ENV` = `production`
   - `DB_NAME` = (nombre de tu base de datos)
   - `DB_USER` = (usuario de la base de datos)
   - `DB_PASSWORD` = (contraseña de la base de datos)
   - `DB_HOST` = (host de la base de datos, ej: mysql-xxxxx.clever-cloud.com)
   - `DB_PORT` = `3306` (o el puerto que te proporcione tu proveedor)
   - `PORT` = (Render asigna esto automáticamente, no es necesario configurarlo)

6. Click en "Create Web Service"

## Notas importantes

- Render ejecutará `npm install` y luego `npm start`
- El archivo `render.yaml` ya está configurado en el repositorio
- La aplicación está configurada para intentar conectar a la base de datos al iniciar, pero continuará funcionando aunque falle la conexión inicial
- Deberás ejecutar las migraciones o sincronizar la base de datos manualmente después del primer despliegue

## Verificar despliegue

Una vez desplegado, visita: `https://tu-app.onrender.com/api/usuarios` para verificar que funciona.
