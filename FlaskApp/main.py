from flask import (Flask, render_template, request)
from flask_mysqldb import MySQL

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
    #print(temp)
    #print(type(temp))
    return render_template("index.html")
@app.route("/SignUpSubmit", methods=["POST", "GET"])
def test():
    print(334)
    if request.method=="POST":
        cursor = mysql.connection.cursor()
        con = mysql.connection
        username = request.form['username']
        nume = request.form['nume']
        prenume = request.form['prenume']
        password = request.form['password']
        email = request.form['email']
        passwordAgain = request.form['passwordAgain']
        if password != passwordAgain:
            return render_template("index.html")
        print(111)
        cursor.execute('''insert into users values (NULL, %s, %s, %s, 1, 1, %s, "1")''', (username, nume, prenume,email))
        con.commit()
        #cursor.execute('''SELECT * from materii ''')
        #print(cursor.fetchall())
        print(11)
    return render_template("index.html")
app.run(debug=True)