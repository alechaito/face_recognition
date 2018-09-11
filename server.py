import face_recognition
from flask import Flask, jsonify, request, redirect
import string
import random
import MySQLdb as mysql

# You can change this to any folder on your system
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)


class User:
    def __init__(self, params=None):
        self.name = params['name']
        self.image = params['image']

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/adduser', methods=['GET', 'POST'])
def upload_image():
    # Check if a valid image file was uploaded
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)

        file = request.files['file']
        user_name = request.form['nome']
        if file.filename == '':
            return redirect(request.url)

        if file and allowed_file(file.filename):
            # The image file seems valid! Detect faces and return the result.
            return save_input(file, user_name)

    # If no valid image file was uploaded, show the file upload form:
    return '''
    <!doctype html>
    <title>Is this a picture of Obama?</title>
    <h1>Upload a picture and see if it's a picture of Obama!</h1>
    <form method="POST" enctype="multipart/form-data">
    <labe>Imagem</label>
    <input type="file" name="file">
    <labe>Nome</label>
    <input type="text" name="nome">
    <input type="submit" value="Upload">
    </form>'''


def train(idx):
    ## Carregando imagem para treinamento
    face = face_recognition.load_image_file(str(idx)+".jpg")
    face_encoding = face_recognition.face_encodings(face)[0]
    f = open("weights/"+str(idx)+".txt", "a+")
    for weight in face_encoding:
        f.write(str(weight)+"\n")

def save_input(img, nome):
    idx = id_generator()
    ## Salvando a imagem localmente para posterior consulta
    img.save(str(idx)+".jpg")
    ## Treinando a rede para obter os pesos faciais de reconhecimento
    train(idx)
    ## Criando o json de dados usuario com os detalhes do input
    user = {
        'name': nome,
        'img': idx,
        'weights': idx,
    }
    ## Salvando instancia de usuario no banco de dados
    save_db(user)

def save_db(user):
    db = mysql.connect(host="localhost", user="root", passwd="252528", db="ubiquos")
    cursor = db.cursor()
    query = ("INSERT INTO users (name, img, weights) VALUES (%s, %s, %s)")
    cursor.execute(query, (user['name'], user['img'], user['weights']))
    db.commit()
    cursor.close()

def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))