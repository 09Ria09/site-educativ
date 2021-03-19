from flask import (Flask, render_template, request)
from flask_mysqldb import MySQL

app = Flask("__main__")
mysql= MySQL(app)
app.config['MYSQL_HOST'] = '85.186.118.126'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '4tzainfo_root'
app.config['MYSQL_DB'] = 'brainerdb'

@app.route("/", methods=["POST", "GET"])
def my_index():
    if request,method="POST":
        test = request.form["t"]
    cursor = mysql.connection.cursor()
    cursor.execute('''SELECT * from users ''')
    temp= cursor.fetchall()
    print(temp)
    print(type(temp))
    return render_template("index.html", flask_token= temp[1][1])
app.run(debug=True)