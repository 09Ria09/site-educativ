import json
import smtplib
import ssl

from flask import Flask, jsonify, request, session, url_for
from flask_cors import CORS
from flask_mysqldb import MySQL
from itsdangerous import SignatureExpired, URLSafeTimedSerializer

import ver as v

# Initizare bot gmail
smtp_server = "smtp.gmail.com"
port = 587
sender_email = "brainerofficialro@gmail.com"
password = "4tzainfo_root"

context = ssl.create_default_context()


def mail_verificare(recipient,code,cont_sau_parola):
    try:
        if  cont_sau_parola=="cont":
            cont_sau_parola = "Validare cont"
        else :cont_sau_parola = "Schimbare Parola"
        server = smtplib.SMTP(smtp_server,port)
        server.starttls(context=context) 
        server.login(sender_email, password)
        message = "Linkul Dumneavoastra este :\n"+code+"\n"
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
s= URLSafeTimedSerializer('6398715B0D903F28D7BBF08370156D9557DDFAE4CBB1A610A9A535F960CF994D' \
                 '8325FCB6CD4C0D980469698435125C6359526E7D17B7BAFE89AA32B6B1361C73')
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '4tzainfo_root'
app.config['MYSQL_DB'] = 'brainerdb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

#VARIABILE

@app.route("/SignUpSubmit", methods=["POST"])
def sign_up():
    success = False
    cursor = mysql.connection.cursor()
    con = mysql.connection
    username =v.nfc(request.form['username'])
    nume =v.nfc(request.form['nume'])
    prenume =v.nfc(request.form['prenume'])
    email = v.normalizare_email(request.form['email'])
    password =v.nfc(request.form['password'])
    password_again =v.nfc(request.form['passwordAgain'])

    erori = v.validare(username, nume, prenume, email, password, password_again)

    if erori == {}:
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
                           (username, nume, prenume,email))
            con.commit()
            cursor.execute('''select id from users where username=%s;''', [username])
            user_id = cursor.fetchall()[0]["id"]
            print("Am adaugat user-ul cu id-ul: {}".format(user_id))
            cursor.execute('''insert into passwords values ( %s, %s);''', (user_id, v.hash_pas(password)))
            con.commit()
            print("Am adaugat parola user-ului cu id-ul: {}".format(user_id))
            session.clear()
            if erori == {}:
                temp= s.dumps(email,salt="cont")
                mail_verificare(email,url_for("verificare_mail",token=temp,_external=True),"cont") 
                print("Mail trimis catre {}".format(email))
            else:
                print("Nu am trimis mail")
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
                cursor.execute('''select verified from users where id=%s;''',  [user_id[0]["id"]])
                session['verified'] = cursor.fetchall()[0]["verified"]
                cursor.execute('''select completed_profile from users where id=%s;''',  [user_id[0]["id"]])
                session['completed_profile'] = cursor.fetchall()[0]["completed_profile"]
                print("Am logat user cu id-ul: {}".format(user_id))
                success = True
            else:
                erori["wrongPassword"] = True
    print(erori)
    if success:
        return {'erori': erori, 'success': success, 'verified': session.get('verified'),
                'completed_profile': session.get('completed_profile')}
    else:
        return {'erori': erori, 'success': success}


@app.route("/GetProfile", methods=["POST"])
def get_profile():
    if session.get('user_id') is None:
        return {}
    return get_profile_helper(session['user_id'])


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
    cursor.execute('''select verified from users where id=%s;''',  [session.get('user_id')])
    session['verified'] = cursor.fetchall()[0]["verified"]
    cursor.execute('''select completed_profile from users where id=%s;''',  [session.get('user_id')])
    session['completed_profile'] = cursor.fetchall()[0]["completed_profile"]
    print(session.get('completed_profile'))
    return {'signedIn': True, 'verified': session.get('verified'), 'completed_profile': session.get('completed_profile')}


@app.route("/SubmitProfile", methods=["POST"])
def submit_profile():
    d = False
    m = False
    c = False
    cursor = mysql.connection.cursor()
    con = mysql.connection
    rq = request.get_json()

    ver = v.verify_profile(mysql, session, rq)

    if not ver['valid']:
        return ver

    if 'username' in rq:
        cursor.execute('''update users set username=%s where id=%s''',
                       (rq['username'], session.get('user_id')))
        con.commit()

    if 'descriere' in rq:
        cursor.execute('''update extra set descriere=%s where user_id=%s''',
                       (json.dumps(rq['descriere'], ensure_ascii=False), session.get('user_id')))
        con.commit()
        d=True

    if 'materii' in rq and type(rq['materii']) == list:
        cursor.execute('''delete from materii where user_id=%s''', [session.get('user_id')])
        con.commit()
        for materie in rq['materii']:
            cursor.execute('''insert into materii values (NULL, %s, %s)''',
                           (session.get('user_id'), materie))
            con.commit()
        m=True

    if 'clasa' in rq:
        print(rq['clasa'])
        cursor.execute('''update users set clasa=%s where id=%s''',
                       (rq['clasa'], session.get('user_id')))
        con.commit()
        c = True

    if d and m and c and (not session.get('completed_profile')):
        cursor.execute('''update users set completed_profile=%s where id=%s''',
                       (1, session.get('user_id')))
        con.commit()
        session['completed_profile'] = True

    return ver


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
        users = get_summaries_helper(users, 'brainerdb.materii', 'materie_id', rq['materii'])

    if 'clasa' in rq and type(rq['clasa']) == list:
        users = get_summaries_helper(users, 'brainerdb.users', 'clasa', rq['clasa'])

    cu = session.get('user_id')
    for user in users:
        if user == cu:
            continue
        tmp = get_profile_helper(user)
        tmp.pop('numar', None)
        tmp.pop('mail', None)
        response.append(tmp)
    return jsonify(response)


def get_summaries_helper(users, table, column, rq):
    cursor = mysql.connection.cursor()

    for x in rq:
        cursor.execute('''SELECT user_id FROM''' + table + '''WHERE ''' + column + '''=%s;''',
                       [x])
        tmp0 = set()
        tmp1 = cursor.fetchall()
        for y in tmp1:
            tmp0.add(y['user_id'])
        users &= tmp0
    return users

@app.route("/VerifyMail/Cont/<token>", methods=["GET"])
def verificare_mail(token):
    succes = False
    erori={}
    cursor = mysql.connection.cursor()
    con = mysql.connection
    try:
        email=s.loads(token,salt="cont",max_age=1000000)
    except SignatureExpired:
        erori["tokenExpirat"]=True
        print("token expired")
    if erori=={}:
        cursor.execute('''select id from users where mail=%s''', [email])
        user_id=cursor.fetchall()[0]["id"]
        cursor.execute('''update brainerdb.users set verified=True where id=%s''',[user_id])
        con.commit()
        print("Verified :{}".format(user_id))
        succes = True
    return {"succes": succes, 'erori':erori}

@app.route("/ForgotPassword", methods=["POST"])
def mail_parola():
    succes = False
    erori={}
    cursor = mysql.connection.cursor()
    con = mysql.connection
    email =v.normalizare_email(request.form['email'])

    cursor.execute('''select id from users where mail=%s''', [email])
    user_id=cursor.fetchall()
    if user_id == ():
        erori["mailNonexistent"]=True 
        print("Nu s-a trimis mail-ul,nu exista")
    else:
        temp= s.dumps(email,salt="parola")
        mail_verificare(email,url_for("schimbare_parola",token=temp,_external=True),"parola") 
        print("Mail trimis catre {}".format(email))
        succes=True
    return {'erori': erori,'succes':succes}
@app.route("/NewPassword/<token>", methods=["POST"])
def schimbare_parola(token):
    succes = False
    erori={}
    cursor = mysql.connection.cursor()
    con = mysql.connection
    password=v.nfc(request.form['password'])
    password_again=v.nfc(request.form['passwordAgain'])
    try:
        email=s.loads(token,salt="parola",max_age=1000)
    except SignatureExpired:
        erori["tokenExpirat"]=True
        print("token expired")
    if erori =={}:
        if password==password_again:
            cursor.execute('''select id from users where mail=%s''', [email])
            user_id=cursor.fetchall()[0]["id"]
            cursor.execute('''update brainerdb.passwords set hash=%s where user_id=%s''',(v.hash_pas(password),user_id))
            con.commit()
        else :erori["passwordMismatch"]=True
    return {"succes":succes,'erori':erori}

@app.errorhandler(404)
def fof():
    return


app.run(debug=True)
