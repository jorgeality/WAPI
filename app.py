import requests
from flask import Flask, render_template

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://ivanbano_grupo6:grupo6@204.93.216.11/ivanbano_grupo6'

from core.database import db
from core.models import *

with app.app_context():
    db.init_app(app)



from core.api_v1 import blueprint as api_v1

app.register_blueprint(api_v1)  # Añadida versión 1 de la API


@app.route('/')
def inicio():
    puntajes = requests.get('http://localhost:5000/api/v1/puntajes/').json()
    print(puntajes)
    return render_template('index.html', puntajes=puntajes)


if __name__ == '__main__':
    app.run(debug=True)