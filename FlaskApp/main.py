import json ,smtplib , ssl, time, datetime
from babel.dates import format_date, format_datetime, format_time
from flask import Flask, jsonify, request, session, url_for,send_file
from flask_cors import CORS
from flask_mysqldb import MySQL
from itsdangerous import SignatureExpired, URLSafeTimedSerializer

import auxiliary as a
import ver as v

# Initizare bot gmail
smtp_server = "smtp.gmail.com"
port = 587
sender_email = "brainerofficialro@gmail.com"
password = "4tzainfo_root"

context = ssl.create_default_context()


def mail_verificare(recipient, code, cont_sau_parola):
    try:
        if cont_sau_parola == "cont":
            cont_sau_parola = "Validare cont"
        else:
            cont_sau_parola = "Schimbare Parola"
        server = smtplib.SMTP(smtp_server, port)
        server.starttls(context=context)
        server.login(sender_email, password)
        message = "Linkul Dumneavoastra este :\n" + code + "\n"
        headers = "\r\n".join(["from: " + sender_email,
                               "subject: " + cont_sau_parola,
                               "to: " + recipient,
                               "mime-version: 1.0",
                               "content-type: text/html"])

        content = headers + "\r\n\r\n" + message
        server.sendmail(sender_email, recipient, content)
    except Exception as e:
        print(e)
    finally:
        print("Sent email")
        server.quit()


app = Flask("__main__")
app.secret_key = '6398715B0D903F28D7BBF08370156D9557DDFAE4CBB1A610A9A535F960CF994D' \
                 '8325FCB6CD4C0D980469698435125C6359526E7D17B7BAFE89AA32B6B1361C73'
mysql = MySQL(app)
s = URLSafeTimedSerializer('6398715B0D903F28D7BBF08370156D9557DDFAE4CBB1A610A9A535F960CF994D' \
                           '8325FCB6CD4C0D980469698435125C6359526E7D17B7BAFE89AA32B6B1361C73')
PAS = " !#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
CHANGE_PASSWORD_URL = 'http://localhost:3000/#/changePassword/'
CACHE_PATH = "./assets/cache"
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '4tzainfo_root'
app.config['MYSQL_DB'] = 'brainerdb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['UPLOAD_FOLDER'] = CACHE_PATH


# VARIABILE

@app.route("/SignUpSubmit", methods=["POST"])
def sign_up():
    success = False
    cursor = mysql.connection.cursor()
    con = mysql.connection
    username = v.nfc(request.form['username'])
    nume = v.nfc(request.form['nume'])
    prenume = v.nfc(request.form['prenume'])
    email = request.form['email']
    password = v.nfc(request.form['password'])
    password_again = v.nfc(request.form['passwordAgain'])

    erori = v.validare(username, nume, prenume, email, password, password_again)

    if erori == {}:
        email = v.normalizare_email(email)
        cursor.execute('''select id from users where username=%s;''', [username])
        user_id = cursor.fetchall()
        if user_id != ():
            erori["usernameTaken"] = True
        cursor.execute('''select id from users where mail=%s;''', [email])
        email_id = cursor.fetchall()
        if email_id != ():
            erori["mailTaken"] = True
        if erori == {}:
            cursor.execute('''insert into users values (NULL, %s, %s, %s, NULL, %s, NULL,0,0)''',
                           (username, nume, prenume, email))
            con.commit()
            cursor.execute('''select id from users where username=%s;''', [username])
            user_id = cursor.fetchall()[0]["id"]
            print("Am adaugat user-ul cu id-ul: {}".format(user_id))
            cursor.execute('''insert into passwords values ( %s, %s);''', (user_id, v.hash_pas(password)))
            con.commit()
            print("Am adaugat parola user-ului cu id-ul: {}".format(user_id))
            cursor.execute('''insert into extra values (NULL, %s, NULL, NULL, NULL)''',
                           [user_id])
            con.commit()
            session.clear()
            session['user_id'] = user_id
            session['verified'] = 1
            session['completed_profile'] = 0
            temp = s.dumps(email, salt="cont")
            mail_verificare(email, url_for("verificare_mail", token=temp, _external=True), "cont")
            print("Mail trimis catre {}".format(email))
            success = True
            return {'erori': erori, 'success': success, 'verified': session.get('verified'),
                    'completed_profile': session.get('completed_profile')}
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
            user_id = cursor.fetchall()
            if user_id == ():
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
                cursor.execute('''select verified from users where id=%s;''', [user_id[0]["id"]])
                session['verified'] = cursor.fetchall()[0]["verified"]
                cursor.execute('''select completed_profile from users where id=%s;''', [user_id[0]["id"]])
                session['completed_profile'] = cursor.fetchall()[0]["completed_profile"]
                print("Am logat user cu id-ul: {}".format(user_id))
                success = True
            else:
                erori["wrongPassword"] = True
    print(erori)
    if success:
        cursor.execute('''select username from users where id=%s;''', [session.get('user_id')])
        session["username"] = cursor.fetchall()[0]["username"]
        cursor.execute('''select mail from users where id=%s;''', [session.get('user_id')])
        session["email"] = cursor.fetchall()[0]["mail"]
        print(session)
        return {'erori': erori, 'success': success, 'verified': session.get('verified'),
                'completed_profile': session.get('completed_profile')}
    else:
        return {'erori': erori, 'success': success}


@app.route("/GetProfile", methods=["POST"])
def get_profile():
    if session.get('user_id') is None:
        return {}
    d=get_profile_helper(session['user_id'])
    print(d)
    return d


def get_profile_helper(user_id):
    profile = {}
    cursor = mysql.connection.cursor()
    cursor.execute('''SELECT * FROM brainerdb.users WHERE id=%s;''', [user_id])
    tmp = cursor.fetchall()
    if tmp != ():
        profile = tmp[0]

    cursor.execute('''SELECT * FROM brainerdb.extra WHERE user_id=%s;''', [user_id])
    tmp = cursor.fetchall()
    if tmp != ():
        profile = {**tmp[0], **profile}

    cursor.execute('''SELECT materie_id FROM brainerdb.materii WHERE user_id=%s;''', [user_id])
    tmp = cursor.fetchall()
    tmpm = []
    for x in tmp:
        tmpm.append(x['materie_id'])
    print(tmpm)
    if tmp:
        profile['materii'] = tmpm
    profile['id']=user_id
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
    cursor = mysql.connection.cursor()
    cursor.execute('''select verified from users where id=%s;''', [session.get('user_id')])
    session['verified'] = cursor.fetchall()[0]["verified"]
    cursor.execute('''select completed_profile from users where id=%s;''', [session.get('user_id')])
    session['completed_profile'] = cursor.fetchall()[0]["completed_profile"]
    return {'signedIn': True, 'verified': session.get('verified'),
            'completed_profile': session.get('completed_profile')}


@app.route("/SubmitProfile", methods=["POST"])
def submit_profile():
    d = False
    m = False
    c = False
    cursor = mysql.connection.cursor()
    con = mysql.connection
    rq = json.loads(request.form['value'])

    ver = v.verify_profile(mysql, session, rq)

    if not ver['valid']:
        return {'ver': ver, 'completed_profile': session['completed_profile']}

    if 'username' in rq:
        cursor.execute('''update users set username=%s where id=%s''',
                       (rq['username'], session.get('user_id')))
        con.commit()

    if 'descriere' in rq:
        print(rq['descriere'])
        cursor.execute('''update extra set descriere=%s where user_id=%s''',
                       (json.dumps(rq['descriere'], ensure_ascii=False), session.get('user_id')))
        con.commit()
        d = True

    if 'materii' in rq and type(rq['materii']) == list:
        cursor.execute('''delete from materii where user_id=%s''', [session.get('user_id')])
        con.commit()
        for materie in rq['materii']:
            cursor.execute('''insert into materii values (NULL, %s, %s)''',
                           (session.get('user_id'), materie))
            con.commit()
        m = True

    if 'clasa' in rq:
        # print(rq['clasa'])
        cursor.execute('''update users set clasa=%s where id=%s''',
                       (rq['clasa'], session.get('user_id')))
        con.commit()
        c = True

    if 'profilePicture' in request.files:
        print(request.files['profilePicture'])
        data=a.upload_wrapper(app, request.files, 'profil', 'image')
        # a.upload_wrapper(app,session,'profil')
        path =data[0]['path']
        print(path)
        cursor.execute('''update extra set icon=%s where user_id=%s''',
                       (path, session.get('user_id')))
        con.commit()

    if d and m and c and (not session.get('completed_profile')):
        cursor.execute('''update users set completed_profile=%s where id=%s''',
                       (1, session.get('user_id')))
        con.commit()
        session['completed_profile'] = 1

    print(session['completed_profile'])
    return {'ver': ver, 'completed_profile': session['completed_profile']}


@app.route("/CheckProfile", methods=["POST"])
def check_profile():
    return v.verify_profile(mysql, session, request.get_json())


@app.route("/GetSummaries", methods=["POST"])
def get_summaries():
    rq = request.get_json()
    if type(rq) != dict:
        return {}
    users = set()
    response = []
    cursor = mysql.connection.cursor()
    cursor.execute('''SELECT id FROM brainerdb.users WHERE completed_profile=1''')
    tmp = cursor.fetchall()
    for y in tmp:
        users.add(y['id'])
    if 'materii' in rq and type(rq['materii']) == list:
        users = get_summaries_helper(users, 'user_id', 'brainerdb.materii', 'materie_id', rq['materii'])

    if 'clasa' in rq and type(rq['clasa']) == list:
        users = get_summaries_helper(users, 'id', 'brainerdb.users', 'clasa', rq['clasa'])

    cu = session.get('user_id')
    for user in users:
        if user == cu:
            continue
        tmp = get_profile_helper(user)
        tmp.pop('numar', None)
        tmp.pop('mail', None)
        response.append(tmp)
    return jsonify(response)


def get_summaries_helper(users, what, table, column, rq):
    cursor = mysql.connection.cursor()

    for x in rq:
        cursor.execute('''SELECT ''' + what + ''' FROM ''' + table + ''' WHERE ''' + column + '''=%s;''',
                       [x])
        tmp0 = set()
        tmp1 = cursor.fetchall()
        for y in tmp1:
            tmp0.add(y[what])
        users &= tmp0
    return users


@app.route("/VerifyMail/Cont/<token>", methods=["GET"])
def verificare_mail(token):
    succes = False
    erori = {}
    cursor = mysql.connection.cursor()
    con = mysql.connection
    try:
        email = s.loads(token, salt="cont", max_age=2 * 60 * 60 * 1000)
    except SignatureExpired:
        erori["tokenExpirat"] = True
        print("token expired")
    if erori == {}:
        cursor.execute('''select id from users where mail=%s''', [email])
        user_id = cursor.fetchall()[0]["id"]
        cursor.execute('''update brainerdb.users set verified=True where id=%s''', [user_id])
        con.commit()
        print("Verified :{}".format(user_id))
        succes = True
    return {"succes": succes, 'erori': erori}


@app.route("/ForgotPassword/", methods=["GET", "POST"])
def mail_parola():
    # RETURN {ERORI"ERORI,'SIUCCES':SUCCESA}
    if request.method == 'POST':
        success = False
        erori = {}
        cursor = mysql.connection.cursor()
        con = mysql.connection
        email = v.normalizare_email(request.form['email'])

        cursor.execute('''select id from users where mail=%s''', [email])
        user_id = cursor.fetchall()
        if user_id == ():
            erori["mailNonexistent"] = True
            print("Nu s-a trimis mail-ul,nu exista")
        else:
            temp = s.dumps(email, salt="parola")
            url = CHANGE_PASSWORD_URL + temp

            print(url)
            mail_verificare(email, url, "parola")
            print("Mail trimis catre {}".format(email))
            success = True
    return {'erori': erori, 'success': success}


@app.route("/changePassword/<token>", methods=["POST"])
def schimbare_parola(token):
    if request.method == 'POST':
        success = False
        erori = {}
        cursor = mysql.connection.cursor()
        con = mysql.connection
        password = v.nfc(request.form['password'])
        print(request.form['password'])
        password_again = v.nfc(request.form['passwordAgain'])
        print(request.form['passwordAgain'])
        if not v.valid(password, PAS): erori['passwordInvalid'] = True
        # VERIFICA PAROLA

        try:
            email = s.loads(token, salt="parola", max_age=5 * 60 * 1000)
            print(email)
        except SignatureExpired:
            erori["tokenExpired"] = True
            print("token expired")
            return {'erori': erori, 'success': success}

        if password == password_again:
            print('test')
            if not v.valid(password, PAS) or len(password) < 6:
                erori['passwordInvalid'] = True
                return {'erori': erori, 'success': success}

            cursor.execute('''select id from users where mail=%s''', [email])
            user_id = cursor.fetchall()[0]["id"]
            cursor.execute('''update brainerdb.passwords set hash=%s where user_id=%s''',
                           (v.hash_pas(password), user_id))
            con.commit()
            success = True
        else:
            erori["passwordMismatch"] = True

    return {'erori': erori, 'success': success}

@app.route('/NewPost', methods=['POST'])
def new_post():
    response = {'title':'','video':'','images':[],'text':'','docs':[]}
    if request.method == 'POST':
        data = a.upload_wrapper(app, request.files, 'postare', 'video')
        for d in data:
            if d['erori']['tipInvalid'] == True:
                response['eroare'] = True
                return response
            
            if d['tip'] == 'vid':
                response['video'] = d['path']
            elif d['tip'] == 'pic':
                response['images'].append(d['path'])
            elif d['tip'] == 'doc':
                response['docs'].append(dict(nume = d['nume'],url = d['path']))
        title = request.form['title']
        text = request.form['text']
        print(8*'$',text, 8*'$')
        response['title'] = title
        response['text'] = text
        cursor = mysql.connection.cursor()
        con = mysql.connection
        response['timp'] = format_date(datetime.datetime.fromtimestamp(time.time()), format='long', locale='ro')
        cursor.execute('''insert into posts values (NULL, %s, NULL, %s, %s, %s)''',
                            (session['user_id'], text, title, response))
        con.commit()
    return response

@app.route('/GedsvsdgxacscafafasfasfsafsadfasdfdsgtNotifications', methods={'GET','POST'})
def testam():
    if request.method=='POST':
        #mesaj=
        #print(mesaj)
        #print(type(mesaj))
        pass

@app.route('/GetNotifications', methods={'GET','POST'})
def get_notifications():
    if request.method =='POST':
        rq=a.get_notifications(session['user_id'],mysql)
        #a.send_notification('message',session,39,mysql,'d')
    # return jsonify([])
    return jsonify(rq)

app.run(debug=True)

