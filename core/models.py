from .database import db

class Palabras(db.Model):
    Palabra = db.Column(db.String(200), primary_key=True)
    Categoria = db.Column(db.Integer)
    Exitos = db.Column(db.Integer)
    Ocurrencias = db.Column(db.Integer)


class puntos(db.Model):
    IDUsuario = db.Column(db.Integer, db.ForeignKey('Usuarios.IDUsuarios'), primary_key=True)
    Puntaje = db.Column(db.Integer)
    Fecha = db.Column(db.String(30))


class Usuarios(db.Model):
    IDUsuarios = db.Column(db.Integer, primary_key=True)
    NombreUsuarios = db.Column(db.String(80), unique=True)

