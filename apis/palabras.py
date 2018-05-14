from flask import request
from flask_restplus import Namespace, Resource
from core.models import Palabras as TablaPalabras
from core.database import db

api = Namespace('palabras', description='Operaciones sobre las palabras')

palabra = api.schema_model('Palabra', {
    'type': 'object',
    'properties': {
        'Palabra': {
            'type': 'string',
            'description': 'Una palabra',
            'example': 'megidolaon'
        },
        'Categoria': {
            'type': 'integer',
            'description': 'La categoria de una palabra, 1 ataque, 0 curacion',
            'example': 1
        },
        'Exitos': {
            'type': 'integer',
            'description': 'Número de veces que se ha escrito la palabra correctamente',
            'example': 12
        },
        'Ocurrencias': {
            'type': 'integer',
            'description': 'Número de veces que se ha escrito la palabra en total',
            'example': 120
        }
    }
})


@api.route('/')
class Palabras(Resource):
    @api.doc(summary='Obtener todas las palabras', responses={200: ('Lista de palabras', [palabra])})
    def get(self):
        return [{'Palabra': palabra.Palabra, 'Categoria': palabra.Categoria, 'Exitos': palabra.Exitos, 'Ocurrencias': palabra.Ocurrencias} for palabra in TablaPalabras.query.all()]


@api.route('/categorias/<int:categoria>')
class PalabrasPorCategoria(Resource):
    @api.doc(summary='Obtener todas las palabras de una categoria dada', responses={200: ('Lista de palabras', [palabra])})
    def get(self, categoria):
        if(categoria == 1):
            return [{'Palabra': palabra.Palabra, 'Categoria': palabra.Categoria, 'Exitos': palabra.Exitos,
                     'Ocurrencias': palabra.Ocurrencias} for palabra in
                    TablaPalabras.query.filter_by(Categoria=1)]

        elif(categoria == 0):
            return [{'Palabra': palabra.Palabra, 'Categoria': palabra.Categoria, 'Exitos': palabra.Exitos,
                     'Ocurrencias': palabra.Ocurrencias} for palabra in
                    TablaPalabras.query.filter_by(Categoria=0)]
        else:
            return ({'message': 'Categoria incorrecta'}, 404)


@api.route('/<string:palabra>')
@api.param('exito', description='Para saber si el usuario introdujo la palabra bien', _in='header', required=True)
class Palabra(Resource):
    @api.doc(summary='Obtener una palabra', responses={200: ('Una palabra', palabra)})
    def get(self, palabra):
        palabra = [{'Palabra': palabra.Palabra, 'Categoria': palabra.Categoria, 'Exitos': palabra.Exitos, 'Ocurrencias': palabra.Ocurrencias} for palabra in TablaPalabras.query.filter_by(Palabra=palabra)]
        return palabra[0] if palabra else ({'message': 'palabra no encontrada'}, 404)

    @api.doc(summary='Actualizar exito y ocurrencia de una palabra', responses={200: ('Actualizado')})
    def put(self, palabra):
        if request.headers.get('exito'):
            try:
                upd = TablaPalabras.query.filter_by(Palabra=palabra)[0]
                if(request.headers.get('exito') == 'si'):
                    upd.Exitos += 1 
                upd.Ocurrencias += 1
                db.session.commit()
            except Exception as e:
                print(e)
                return {'message': 'Algo salio mal'}, 400
            finally:
                db.session.close()
        else:
            return {'message': 'Se necesita el exito!'}, 400
        return {'message': 'Actualizado'}, 200

