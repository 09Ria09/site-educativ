
from flask import (Flask, request, jsonify, session)
from flask_mysqldb import MySQL
from flask_cors import CORS
import ver as v
app = Flask("__main__")
app.secret_key='6398715B0D903F28D7BBF08370156D9557DDFAE4CBB1A610A9A535F960CF994D8325FCB6CD4C0D980469698435125C6359526E7D17B7BAFE89AA32B6B1361C73'
mysql= MySQL(app)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '4tzainfo_root'
app.config['MYSQL_DB'] = 'brainerdb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

@app.route("/SignUpSubmit", methods=["POST"])
def signUp():

    success = False
    cursor = mysql.connection.cursor()
    con = mysql.connection
    username = request.form['username']
    nume = request.form['nume']
    prenume = request.form['prenume']
    email = request.form['email']
    password = request.form['password']
    passwordAgain = request.form['passwordAgain']

    erori = v.validare(username,nume,prenume,email,password,passwordAgain)

    if erori=={}:
        cursor.execute('''select id from users where username=%s;''', [v.nfc(username)])
        userId=cursor.fetchall()
        if userId!=() : erori["usernameTaken"]=True
        cursor.execute('''select id from users where mail=%s;''', [v.nfc(email)])
        userId=cursor.fetchall()
        if userId!=() : erori["mailTaken"]=True
        if erori=={}:
            cursor.execute('''insert into users values (NULL, %s, %s, %s, 1, 1, %s, "1")''', (v.nfc(username), nume, prenume,v.nfc(email)))
            con.commit()
            cursor.execute('''select id from users where username=%s;''', [v.nfc(username)])
            userId=cursor.fetchall()[0]["id"]
            print("Am adaugat user-ul cu id-ul: {}".format(userId))
            cursor.execute('''insert into passwords values ( %s, %s);''', (userId, v.hashPas(v.nfc(password))))
            con.commit()
            print("Am adaugat parola user-ului cu id-ul: {}".format(userId))
            session['userId']=userId
            success=True
        else :
            print("Nu am adaugat nimic in baza")
    print(erori)
    return {'erori':erori, 'success':success}

@app.route("/SignInSubmit", methods=["POST"])
def signIn():

    success = False
    cursor = mysql.connection.cursor()
    con = mysql.connection
    usernameOrEmail = request.form['usernameOrEmail']
    password = request.form['password']

    erori = v.validareUE(usernameOrEmail, password)

    if erori=={}:

        if usernameOrEmail.count('@'):
            cursor.execute('''select id from users where mail=%s;''', [v.nfc(usernameOrEmail)])
            userId=cursor.fetchall()
            if userId==() : erori["mailNonexistent"]=True
        else :
            cursor.execute('''select id from users where username=%s;''', [v.nfc(usernameOrEmail)])
            userId=cursor.fetchall()
            if userId==() : erori["usernameNonexistent"]=True
        if erori=={}:
            cursor.execute('''select hash from passwords where user_id=%s;''', [userId[0]["id"]])
            correctPassword = cursor.fetchall()
            if correctPassword[0]['hash'] == v.hashPas(v.nfc(password)):
                session['userId']=userId[0]["id"]
                print("Am logat user cu id-ul: {}".format(userId))
                success=True
            else : erori["wrongPassword"]=True
    print(erori)
    return {'erori':erori, 'success':success}

@app.route("/GetProfile", methods=["POST"])
def getProfile():
    try:
        print(session['userId'])
        cursor = mysql.connection.cursor()
        cursor.execute('''SELECT * FROM brainerdb.users WHERE id=%s;''', [session['userId']])
        profile = cursor.fetchall()[0]
        return profile
    except:
        print('profile failed')
        return {}

@app.route("/SignOut", methods=["POST"])
def signOut():
    session['userId']=None
    print('signed out user')
    return {'signedOut':True}

@app.errorhandler(404)
def fof():
    return

app.run(debug=True)