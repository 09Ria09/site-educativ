from flask import (Flask, render_template)
from flask_mysqldb import MySQL

app = Flask("__main__")
mysql= MySQL(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '4tzainfo_root'
app.config['MYSQL_DB'] = 'brainerdb'

@app.route("/")
def my_index():
    cursor = mysql.connection.cursor()
    cursor.execute('''SELECT * from users ''')
    temp= cursor.fetchall()
    print(temp)
    print(type(temp))
    return render_template("index.html", flask_token= temp[0][1])
app.run(debug=True)