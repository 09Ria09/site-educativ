import imghdr, os ,uuid, time, magic ,math,datetime

from babel.dates import format_date, format_datetime, format_time
from docx2pdf import convert
from werkzeug.utils import secure_filename

import ver as v

ETM={'video':'vid','images':'img','docs':'doc'}

def get_path_abs(app,path):
    file_path = './public/' + path
    file_path = os.path.join(app.static_folder, path).replace("FlaskApp\\static","ReactApp\\public",1)
    file_path = file_path.replace('\\', '/')
    return file_path

def get_path_rel(app,path):
    return 0
def format(timp):
    if timp==1:
        return '''1 secundă'''
    if timp<20:
        return '''{} secunde'''.format(timp)
    if timp<60:
        return '''{} de secunde'''.format(timp)
    timp=math.floor(timp/60)
    if timp==1:
        return '''1 minut'''
    if timp<20:
        return '''{} minute'''.format(timp)
    if timp<60:
        return '''{} de minute'''.format(timp)
    timp=math.floor(timp/60)
    if timp==1:
        return '''1 oră'''
    if timp<20:
        return '''{} ore'''.format(timp)
    if timp<24:
        return '''{} de ore'''.format(timp)
    timp=math.floor(timp/24)
    if timp==1:
        return '''1 zi'''
    if timp<20:
        return '''{} zile'''.format(timp)
    if timp<30:
        return '''{} de zile'''.format(timp)
    timp=math.floor(timp/30)    
    if timp==1:
        return '''1 lună'''
    if timp<12:
        return '''{} luni'''.format(timp)
    timp=math.floor(timp/12)    
    if timp==1:
        return '''1 an'''
    if timp<20:
        return '''{} ani'''.format(timp)
    else : return '''{} de ani'''.format(timp)



def list_to_dict(list):
    return dict(zip([num for num in range(0, len(list))], [x for x in list]))

def upload_wrapper(app, files, where, et):
    data = []
    for file in files:
        for f in files.getlist(file):
            data.append(upload(app, files, f, where, et))
    return list_to_dict(data)

def upload(app, request, file, where,et):
    print(imghdr.what(file))
    erori = {}
    tip = 'invalid'
    path = ''
    if file.filename == '' or not file:
        print('Nu s-a trimis nimic')
        erori['noFile'] = True
    if erori == {}:
        temp = v.file_type(file.filename)
        tip = temp[0]
        print(file.filename)
        erori['tipInvalid'] = False
        # if tip=='invalid':
        #   erori['tipInvalid']=True
        if where == 'profil':
            path = 'profilePics'
            if tip != 'pic':
                erori['tipInvalid'] = True
        elif where == 'postare':
            if tip == "pic":
                path = 'posts/images'
            elif tip == "vid":
                path = 'posts/videos'
            elif tip == "doc":
                path = "posts/docs"
            else:
                path = "posts/texts"
        nume = secure_filename(uuid.uuid4().hex) + '.' + temp[1]
        path = os.path.join(path, nume)
        erori['test'] = tip
        print(tip)
        if file and not erori['tipInvalid']:
            print(20*"&")
            print("*")
            print(app.static_folder)
            print("*")
            file_path = './public/' + path
            print(file_path)
            file_path = os.path.join(app.static_folder, path).replace("FlaskApp\\static","ReactApp\\public",1)
            file_path = file_path.replace('\\', '/')
            print(file_path)
            file.save(file_path)
            print(tip)
            if tip == "invalid":
                if "text/" not in magic.from_file(file_path, mime=True) :
                    print(30*"&")
                    os.remove(file_path)
                    erori['tipInvalid'] = True
            elif '.docx' in file.filename:
                print(file_path)
                convert(file_path)
                os.remove(file_path)

        else:
            return 0
    return {'erori': erori, 'tip': tip, 'path':path}

def send_notification(tip, session, receiver, mysql,message = ''):
    data={}
    erori = {}
    if(tip == "message"):
        if(len(message) > 7999 ):
            erori["preaLung"] = True
        if(message == None or message == ''):
            erori["mesajInvalid"] = True
        if(erori != {}):
            return erori
    current_user = session["username"]
    if(tip == "match"):
        message = "{} vrea să învățați împreună!".format(current_user)
    timp = time.time()
    cursor = mysql.connection.cursor()
    con = mysql.connection
    cursor.execute('''insert into notifications values (NULL, %s, %s, %s, %s, %s)''',
                           (tip, session['user_id'], receiver, message, timp))
    con.commit()
    d= datetime.datetime.fromtimestamp(timp)
    t=format_date(d, format='long', locale='ro')
    return {'erori':erori,'timp':t}

def get_notifications(id,mysql) : 
    cursor = mysql.connection.cursor()
    cursor.execute('''select * from notifications where sender =%s ''',[id])
    m=cursor.fetchall()
    for x in m:
        cursor.execute('''select username from users where id =%s ''',[x['sender']])
        a=cursor.fetchall()[0]['username']
        cursor.execute('''select icon from extra where user_id =%s ''',[x['sender']])
        x['icon']=cursor.fetchall()[0]['icon']
        x['sender']=a
        x['delta']=format(time.time()-x['time'])
        d=datetime.datetime.fromtimestamp(x['time'])
        x['time']=format_date(d, format='long', locale='ro')
        
        
    print(list(m))
    return list(m)

def follow(session,followee,mysql):
    cursor = mysql.connection.cursor()
    con = mysql.connection
    cursor.execute('''select * from follow where follower =%s ''',[session['user_id']])
    m=cursor.fetchall()
    return m
           