
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
#app.config['MYSQL_CURSORCLASS'] = 'DictCursor'



@app.route("/", methods=["POST", "GET"])
def my_index():
    
    cursor = mysql.connection.cursor()
    cursor.execute('''SELECT * from users ''')
    temp= cursor.fetchall()
    return render_template("index.html")
@app.route("/SignUpSubmit", methods=["POST", "GET"])
def signUp():
    print(334)

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
            cursor.execute('''insert into users values (NULL, %s, %s, %s, 1, 1, %s, "1")''', (v.nfc(username), nume, prenume,email))
            con.commit()
           # cursor.execute('''select id from users where user = %s''',username)
           # userId = cursor.fetchall()
           #cursor.execute('''insert into passwords values (NULL, %s, %s)''', (userId, v.hashPas(v.nfc(password))))
            
        else :
            print(erori)
        #print(cursor.fetchall())
        print(11)
    return render_template("index.html",erori = erori)
app.run(debug=True)