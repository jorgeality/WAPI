# API REST con flask-restplus

La estructura del proyecto es la siguiente:

Proyecto/
  apis/
    __init__.py
    puntajes.py
    palabras.py
    usuarios.py
  core/
    __init__.py
    database.py
    models.py
    api_v1.py
  templates/
    index.html
  api_v1.py
  app.py
  Pipfile
  Pipfile.lock
  README.md

Se siguió el modelo descrito en [la documentación de flask_restplus](http://flask-restplus.readthedocs.io/en/stable/scaling.html) para escalar un proyecto.
Se crearon 3 espacios de nombre: puntajes, palabras y usuarios para las operaciones de
cada uno.

## Instalación

Para poder ejecutar el proyecto debes tener instalado [pipenv](https://github.com/pypa/pipenv)
para python3, entonces ubicarte en el directorio del proyecto y hacer:

$ pipenv install

Esto creará un virtualenv con todas las dependencias que necesitará el proyecto.
Solo falta ejecutarlo, para esto se debe activar el virtualenv:

$ pipenv shell

Entonces inicias el proyecto con:

$ python app.py

## Notas

Para evitar [dependencias cíclicas](http://stackabuse.com/python-circular-imports/) se optó por
separar la conección con la base de datos en el módulo core/database.py. Además de que esto
permite que los modelos puedan ser importados por los blueprint en apis/ ya que van a estar
cargados luego de que en app.py se inicialice la base de datos con:

from core.database import db
from core.models import *

with app.app_context():
    db.init_app(app)   //No se usa db.createall() debido a que las tablas ya existen en una base de datos remota


## Trabajo pendiente

1. A parte de implementar el juego en phaser falta un mecanismo para editar los scores (solo se pueden agregar
   con un POST, pero no hay un PUT para editar). #Done!

2. falta implementar el agregar las y editar las palabras a la base de datos. #Editar Done

3. Por simplicidad usé sqlite3 para el proyecto, para cambiarlo debes ir a app.py y
   reemplazar la uri de sqlite3 por la tuya. #DONE, MYSQL implementado usando el dialect PYmySQL

4. Agregar un esquema de seguridad para la creación de los usuarios, como json web tokens en conjunto con
   http basic authentication (tenga en cuenta que solo es seguro usando SSL).
   Esto se tendra en cuenta cuando se necesite la creacion de contraseñas!

5. Falta adaptar puntajes para que use correctamente la base de datos en MySql #DONE
