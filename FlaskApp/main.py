
from flask import (Flask, render_template, request)
from flask_mysqldb import MySQL
import ver as v
app = Flask("__main__")
mysql= MySQL(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '4tzainfo_root'
app.config['MYSQL_DB'] = 'brainerdb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'



@app.route("/", methods=["POST", "GET"])
def my_index():
    
    cursor = mysql.connection.cursor()
    cursor.execute('''SELECT * from users ''')
    temp= cursor.fetchall()
    return render_template("index.html")
@app.route("/SignUpSubmit", methods=["POST", "GET"])
def signUp():
    print("Start")

    if request.method=="POST":
        cursor = mysql.connection.cursor()
        con = mysql.connection
        username = request.form['username']
        nume = request.form['nume']
        prenume = request.form['prenume']
        email = request.form['email']
        password = request.form['password']
        passwordAgain = request.form['passwordAgain']
        
        erori = v.validare(username,nume,prenume,email,password,passwordAgain)
        
        if erori==[]:
            cursor.execute('''select id from users where username=%s;''', [v.nfc(username)])
            userId=cursor.fetchall()
            if userId!=() :erori.append("usernameTaken")
            cursor.execute('''select id from users where mail=%s;''', [v.nfc(username)])
            userId=cursor.fetchall()
            if userId!=() :erori.append("mailTaken")
            if erori==[]:
                cursor.execute('''insert into users values (NULL, %s, %s, %s, 1, 1, %s, "1")''', (v.nfc(username), nume, prenume,v.nfc(email)))
                con.commit()
                cursor.execute('''select id from users where username=%s;''', [v.nfc(username)])
                userId=cursor.fetchall()[0]["id"] 
                print("Am adaugat user-ul cu id-ul: {}".format(userId))
                cursor.execute('''insert into passwords values ( %s, %s);''', (userId, v.hashPas(v.nfc(password))))
                con.commit()
                print("Am adaugat parola user-ului cu id-ul: {}".format(userId))
            else :
                print("Nu am adaugat nimic in baza")
        print(erori)
        print("End")
    return render_template("index.html",erori = erori)
app.run(debug=True)