from flask import Blueprint
from flask_restplus import Api
from apis.puntajes import api as puntajes
from apis.palabras import api as palabras
from apis.usuarios import api as usuarios

blueprint = Blueprint('api', __name__, url_prefix='/api/v1')

api = Api(blueprint, title='Ejemplo API REST', version='1.0.0',
          description='API para un juego mamon :v')

api.add_namespace(puntajes, path='/puntajes')
api.add_namespace(palabras, path='/palabras')
api.add_namespace(usuarios, path='/usuarios')
