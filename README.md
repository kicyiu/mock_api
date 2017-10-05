# mock_api

Pasos para probar la API

1. Crear una base de dato en MySQL llamado prueba_db y ejecutar el script Users.sql para llenar
la base de dato de información.
2. Abrir el archivo dbconfig.json que se encuentra en la carpeta raiz del proyecto y 
configurar el usuario y la contraseña de MySQL, por defecto está en user: root y passsword: root.
3.Abrir el terminal o linea de comandos y ejecuar dentro de la carpeta raíz del proyecto el
comando $ node index.js para iniciar el servidor de node js en el puerto 8080.
4. Cargar con POSTMAN el siguiente link de colecciones "https://www.getpostman.com/collections/f4597139cc897f3470a7"
para instanciar las pruebas.
5. Ejecutar las pruebas en el siguiente orden por carpeta Create, Read, Login, Update.
6. En las pruebas de Create se crearán 5 usuarios.
7. En Read se leerá todos los usuarios.
8. Se realizará 3 pruebas de Login: primero iniciará sesión con un usuario exitosamente,
luego se iniciará sesión con un usuario que no existe en la base de dato y finalmente se intrducirá un usuario con
una contraseña incorrecta.
9. En Update se actualizará el correo y la contraseña del usuario rachel que fue creado previamente.
10. Finalmente en la prueba de Delete se eliminará el usuario msharapova que fue credo previamente.
