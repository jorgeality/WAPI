from flask import request
from flask_restplus import Namespace, Resource
from core.models import Usuarios as TablaUsuarios
from core.database import db

api = Namespace('usuarios', description='Operaciones sobre los usuarios')

usuario = api.schema_model('Usuario', {
    'type': 'object',
    'properties': {
        'IDusuarios':{
            'type': 'integer',
            'description': 'El ID del usuario',
            'ejemplo': 1
        },
        'NombreUsuarios':{
            'type': 'string',
            'description': 'El nombre del usuario',
            'ejemplo': 'Arashi'
        }
    }
})

# Puesto a modo de ejemplo, no es buena idea dejar al alcance de todos el acceso a la lista de todos los usuarios y menos con las contraseñas
@api.route('/')
class Usuario(Resource):
    @api.doc(summary='Obtener todos los usuarios', responses={200: ('Lista de usuarios', [usuario])})
    def get(self):
        return [{'IDusuarios': usuario.IDUsuarios, 'NombreUsuario': usuario.NombreUsuarios} for usuario in  TablaUsuarios.query.all()]

"""
    Los parámetros se pasan por la cabecera http en lugar de ir en la ruta o en el query string,
    dada la naturaleza de la información. Nadie quiere que en la url diga:
    api/v1/usuarios/nuevo?nombre=esperanto&passwd=departure
"""

@api.route('/nuevo')
@api.param('NombreUsuarios', description='Nombre del usuario', _in='header', required=True)
class NuevoUsuario(Resource):
    @api.doc(summary='Crear nuevo usuario', responses={201: ('Nuevo usuario creado con exito')})
    def post(self):
        if request.headers.get('NombreUsuarios'):
            try:
                db.session.add(TablaUsuarios(NombreUsuarios=request.headers.get('NombreUsuarios')))
                db.session.commit()
            except Exception as e:
                print(e)
                return {'message': 'Datos erróneos (usuario ya existe)'}, 400
        else:
            return {'message': 'Datos erróneos (deben proveerse tanto usuario como contraseña)'}, 400
        return {'message': 'Nuevo usuario creado con éxito'}, 201
