from flask import (Flask, request, session)
from flask_mysqldb import MySQL
from flask_cors import CORS
import ver as v
import smtplib, ssl

#Initizare bot gmail
smtp_server = "smtp.gmail.com"
port = 587 
sender_email = "brainerofficialro@gmail.com"
password = "4tzainfo_root"

context = ssl.create_default_context()

def mail_verificare(recipient)
    try:
        server = smtplib.SMTP(smtp_server,port)
        server.starttls(context=context) # Secure the connection
        server.login(sender_email, password)
        message = "TEST"
        server.sendmail(sender_email, recipient, message)
    except Exception as e:
        print(e)
    finally:
        server.quit() 


app = Flask("__main__")
app.secret_key = '6398715B0D903F28D7BBF08370156D9557DDFAE4CBB1A610A9A535F960CF994D' \
                 '8325FCB6CD4C0D980469698435125C6359526E7D17B7BAFE89AA32B6B1361C73'
mysql = MySQL(app)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '4tzainfo_root'
app.config['MYSQL_DB'] = 'brainerdb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'


@app.route("/SignUpSubmit", methods=["POST"])
def sign_up():
    success = False
    cursor = mysql.connection.cursor()
    con = mysql.connection
    username = request.form['username']
    nume = request.form['nume']
    prenume = request.form['prenume']
    email = request.form['email']
    password = request.form['password']
    password_again = request.form['passwordAgain']

    erori = v.validare(username, nume, prenume, email, password, password_again)

    if erori == {}:
        cursor.execute('''select id from users where username=%s;''', [v.nfc(username)])
        user_id = cursor.fetchall()
        if user_id != ():
            erori["usernameTaken"] = True
        cursor.execute('''select id from users where mail=%s;''', [v.nfc(email)])
        email = cursor.fetchall()
        if email != ():
            erori["mailTaken"] = True
        if erori == {}:
            cursor.execute('''insert into users values (NULL, %s, %s, %s, 1, 1, %s, "1")''',
                           (v.nfc(username), nume, prenume, v.nfc(email)))
            con.commit()
            cursor.execute('''select id from users where username=%s;''', [v.nfc(username)])
            user_id = cursor.fetchall()[0]["id"]
            print("Am adaugat user-ul cu id-ul: {}".format(user_id))
            cursor.execute('''insert into passwords values ( %s, %s);''', (user_id, v.hash_pas(v.nfc(password))))
            con.commit()
            print("Am adaugat parola user-ului cu id-ul: {}".format(user_id))
            session.clear()
            session['user_id'] = user_id
            success = True
        else:
            print("Nu am adaugat nimic in baza")
    print(erori)
    return {'erori': erori, 'success': success}


@app.route("/SignInSubmit", methods=["POST"])
def sign_in():
    success = False
    cursor = mysql.connection.cursor()
    username_or_email = request.form['usernameOrEmail']
    password = request.form['password']

    erori = v.validare_ue(username_or_email, password)

    if erori == {}:

        if username_or_email.count('@'):
            cursor.execute('''select id from users where mail=%s;''', [v.nfc(username_or_email)])
            email = cursor.fetchall()
            if email == ():
                erori["mailNonexistent"] = True
        else:
            cursor.execute('''select id from users where username=%s;''', [v.nfc(username_or_email)])
            user_id = cursor.fetchall()
            if user_id == ():
                erori["usernameNonexistent"] = True
        if erori == {}:
            cursor.execute('''select hash from passwords where user_id=%s;''', [user_id[0]["id"]])
            correct_password = cursor.fetchall()
            if correct_password[0]['hash'] == v.hash_pas(v.nfc(password)):
                session.clear()
                session['user_id'] = user_id[0]["id"]
                print("Am logat user cu id-ul: {}".format(user_id))
                success = True
            else:
                erori["wrongPassword"] = True
    print(erori)
    return {'erori': erori, 'success': success}


@app.route("/GetProfile", methods=["POST"])
def get_profile():
    if session.get('user_id') is None:
        return {}
    cursor = mysql.connection.cursor()

    cursor.execute('''SELECT * FROM brainerdb.users WHERE id=%s;''', [session['user_id']])
    tmp = cursor.fetchall()
    if tmp != ():
        profile = tmp[0]

    cursor.execute('''SELECT * FROM brainerdb.extra WHERE user_id=%s;''', [session['user_id']])
    tmp = cursor.fetchall()
    if tmp != ():
        profile = {**tmp[0], **profile}

    return profile


@app.route("/SignOut", methods=["POST"])
def sign_out():
    session.clear()
    print('signed out user')
    return {'signedOut': True}


@app.route("/IsSignedIn", methods=["POST"])
def is_signed_in():
    if session.get('user_id') is None:
        return {'signedIn': False}
        print('it is')
    return {'signedIn': True}


@app.route("/SubmitTextEdit", methods=["POST"])
def submit_text_edit():
    if session.get('user_id') is None:
        return {'invalid': False}
    cursor = mysql.connection.cursor()
    con = mysql.connection
    rq = request.get_json()
    if rq['type'] == 'descriere':

        #TODO: create correct valid function, also check for length
        #if not v.valid(rq['value'], v.PAS):
        #    return {'invalid': 'Conține caractere invalide.'}

        cursor.execute('''select id from extra where user_id=%s''', [session.get('user_id')])
        if cursor.fetchall() == ():
            cursor.execute('''insert ignore into extra (user_id,descriere) values(%s,%s)''',
                           (session.get('user_id'), rq['value']))
        else:
            cursor.execute('''update extra set descriere=%s where user_id=%s''',
                           (rq['value'], session.get('user_id')))
        con.commit()

    if rq['type'] == 'username':

        if not v.valid(rq['value'], v.SPECIAL):
            return {'invalid': 'Username-ul este invalid.'}

        cursor.execute('''select id from users where username=%s;''', [v.nfc(rq['value'])])
        if cursor.fetchall() != ():
            return {'invalid': 'Există deja un alt cont cu acest username.'}

        cursor.execute('''update users set username=%s where id=%s''',
                       (rq['value'], session.get('user_id')))
        con.commit()

    return {'invalid': ''}


@app.errorhandler(404)
def fof():
    return


app.run(debug=True)
