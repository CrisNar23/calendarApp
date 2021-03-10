calendarApp

Base de datos
1. Crear una base de datos MongoDB con el nombre calendarAppDB o reemplazar el nombre deseado en el archivo .env de la aplicación

Backend

1. Dentro de la carpteta calendar-core ejecutar el comando npm i
2. Una vez instaladas las dependencias se debe iniciar la aplicación con el comando npm run dev
3. Dentro de la carpeta postman de se encuentra el archivo de configuración con los request creados en el backend de la aplicación. Se debe importar la colección a Postman desde el menú File -> Importar en la pestaña File.
4. Se añadió roles y autenticación de usuarios a la aplicación por lo que se debe crear un usuario desde el endpoint signUp con los siguientes parametros: username, email, password y roles. Este último es una array con los valores ["admin", "standart"]. 
  - El campo roles no es obligatorio pero solo un admin puede ejecutar acciones de crear, actualizar y eliminar eventos. 
  - El role stantdard es solo paara lectura.
5. Se debe incluir en los headers el token que se genera al crear usuario o al iniciar sesión en signIn con el usuario creado. La llave será x-access-token y el valor el token generado.

Nota: La mayoría de las configuraciones de Postman como headers, params y body ya vienen cargadas en el archivo de la carpeta Postman.

Frontend

No se alcanzó a implementar funcionalidad al Frontend por falta de tiempo, se crea una plantilla que sería utilizada para complementar la prueba técnica.