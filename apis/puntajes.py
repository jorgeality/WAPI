from flask import request, make_response
from flask_restplus import Namespace, Resource, reqparse
from core.models import puntos as TablaPuntajes
from core.models import Usuarios as TablaUsuarios
from datetime import datetime
from core.database import db

api = Namespace('puntajes', description='Operaciones sobre los puntajes')

puntaje = usuario = api.schema_model('Puntaje', {
    'type': 'object',
    'properties': {
        'usuario':{
            '$ref' : '#/definitions/usuario'
        },
        'Puntaje': {
            'type': 'number',
            'description': 'La puntuación de un usuario',
            'example': 9999999
        },

        },'Fecha': {
            'type': 'string',
            'description': 'Fecha en el que se registró el puntaje'

    }
})


@api.route('/')
class Puntajes(Resource):
    @api.doc(summary='Obtener todos los puntajes', responses={200: ('Lista de puntajes', [puntaje])})
    def get(self):
        return [{'IDusuario': puntaje.IDUsuario, 'Puntaje': puntaje.Puntaje, 'Fecha': str(puntaje.Fecha)} for puntaje in TablaPuntajes.query.all()]


@api.route('/<string:username>')
class PuntajeUsuario(Resource):
    @api.doc(summary='Obtener los puntajes de un usuario', responses={200: ('Lista de puntajes', [puntaje])})
    def get(self, username):
        usuario = TablaUsuarios.query.filter_by(NombreUsuarios=username)[0]
        return [{'Usuario': puntaje.IDUsuario, 'Puntaje': puntaje.Puntaje, 'Fecha': str(puntaje.Fecha)} for puntaje in TablaPuntajes.query.filter_by(IDUsuario=usuario.IDUsuarios)]


@api.route('/agregar')
@api.param('nombre_usuario', description='Nombre del usuario que obtuvo la puntuacion', _in='query', required=True, type='string')
@api.param('puntaje', description='Puntaje que obtuvo el usuario', _in='query', required=True, type='number')
@api.param('fecha', description='Fecha de registro del puntaje (el formato es año-mes-dia)', _in='query', required=True, type='string')
class NuevoPuntaje(Resource):
    @api.doc(summary='Agregar un nuevo puntaje', responses={201: 'Nuevo puntaje creado', 400: 'No se pudo crear el puntaje'})
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('nombre_usuario', type=str, required=True, location='args')
        parser.add_argument('puntaje', type=int, required=True, location='args')
        parser.add_argument('fecha', type=str, required=True, location='args')
        args = parser.parse_args()
        try:
            idselector = TablaUsuarios.query.filter_by(NombreUsuarios=args['nombre_usuario'])[0]
            id = idselector.IDUsuarios
            db.session.add(TablaPuntajes(IDUsuario=id, Puntaje=args['puntaje'], Fecha=args['fecha']))
            db.session.commit()
        except Exception as e:
            print(e)
            return {'message': 'No se pudo agregar el nuevo puntaje'}, 400
        return {'message': 'Nuevo puntaje guardado con exito'}, 200



@api.route('/actualizar')
@api.param('nombre_usuario', description='Nombre del usuario que obtuvo la puntuacion', _in='query', required=True, type='string')
@api.param('puntaje', description='Puntaje del jugador', _in='query', required=True, type='integer')
class ActualizarPuntaje(Resource):
    @api.doc(summary='Actualizar puntaje existente',
             responses={200: 'Puntaje actualizado', 400: 'No se pudo actualizar'})
    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('nombre_usuario', type=str, required=True, location='args')
        parser.add_argument('puntaje', type=int, required=True, location='args')
        args = parser.parse_args()

        try:
            upt = TablaUsuarios.query.filter_by(NombreUsuarios=args['nombre_usuario'])[0]
            uptp = TablaPuntajes.query.filter_by(IDUsuario=upt.IDUsuarios)[0]
            uptp.Puntaje = int(args['puntaje'])

            datetoday = datetime.utcnow()
            uptp.Fecha = str(datetoday.year) + "-" + str(datetoday.month) + "-" + str(datetoday.day)
            db.session.commit()

        except Exception as e:
            print(e)
            return {'message': 'No se pudo actualizar el puntaje'}, 400
        return {'message': 'Puntaje actualizado'}, 200
