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
    timp=math.floor(timp)
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



#def list_to_dict(list):
#    return dict(zip([num for num in range(0, len(list))], [x for x in list]))

def upload_wrapper(app, files, where, et):
    data = []
    for file in files:
        for f in files.getlist(file):
            data.append(upload(app, files, f, where, et))
    return data


def upload(app, request, file, where,et):
    erori = {}
    tip = 'invalid'
    path = ''
    if file.filename == '' or not file:
        print('Nu s-a trimis nimic')
        erori['noFile'] = True
    if erori == {}:
        temp = v.file_type(file.filename)
        tip = temp[0]
        filename = file.filename
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
        if file and not erori['tipInvalid']:
            file_path = './public/' + path
            file_path = os.path.join(app.static_folder, path).replace("FlaskApp\\static","ReactApp\\public",1)
            file_path = file_path.replace('\\', '/')
            print(file_path)
            file.save(file_path)
            if tip == "invalid":
                if "text/" not in magic.from_file(file_path, mime=True) :
                    os.remove(file_path)
                    erori['tipInvalid'] = True
                else:
                    tip = 'doc'
            #elif '.docx' in file.filename:
            #    convert(file_path)
            #    os.remove(file_path)

        else:
            return 0
    return {'erori': erori, 'tip': tip, 'path':path, 'nume' : filename}

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
    cursor.execute('''select * from notifications where receiver =%s ''',[id])
    m=cursor.fetchall()
    for x in m:
        cursor.execute('''select username from users where id =%s ''',[x['sender']])
        a=cursor.fetchall()[0]['username']
        cursor.execute('''select icon from extra where user_id =%s ''',[x['sender']])
        x['icon']=cursor.fetchall()[0]['icon']
        x['id'] = x['sender']
        x['sender']=a
        x['delta']=format(time.time()-x['time'])
        d=datetime.datetime.fromtimestamp(x['time'])
        x['time']=format_date(d, format='long', locale='ro')
        
    k = list(m)
    k.reverse()
    return k

def follow(session,followee,mysql):
    cursor = mysql.connection.cursor()
    con = mysql.connection
    cursor.execute('''select * from follow where follower =%s ''',[session['user_id']])
    m=cursor.fetchall()
    return m

def ascunde(session,blocked,mysql):
    cursor = mysql.connection.cursor()
    con = mysql.connection
    cursor.execute('''select blocked from block where blocker =%s ''',[session['user_id']])
    cursor.execute('''insert into block values (%s,%s)''',(session['user_id'],blocked))
    con.commit()
    return 0

def give_rating(session,target,mysql ,stars):
    cursor = mysql.connection.cursor()
    con = mysql.connection
    #user_id=session['user_id']
    cursor.execute('''select * from rating where from_id =%s and to_id=%s''',(session['user_id'],target))
    temp=cursor.fetchall()
    print(temp)
    if temp ==():
        cursor.execute('''insert into rating values (%s,%s,%s)''',(session['user_id'],target,stars))
        con.commit()
        cursor.execute('''select rating from extra where user_id =%s ''',[target])
        rating=cursor.fetchall()[0]['rating']
        print(rating)
        cursor.execute('''select nr from extra where user_id =%s ''',[target])
        number_of_ratings=cursor.fetchall()[0]['nr']
        print(number_of_ratings)
        rating = (rating*number_of_ratings+stars)/(number_of_ratings+1)
        cursor.execute('''update extra set nr=%s where user_id=%s''', (number_of_ratings+1,target))
        con.commit()
        cursor.execute('''update extra set rating=%s where user_id=%s''', (rating,target))
        con.commit()
    else:
        cursor.execute('''select rating from rating where from_id =%s and to_id=%s ''',(session['user_id'],target))
        stars_vechi=cursor.fetchall()[0]['rating']
        print(stars_vechi)
        cursor.execute('''select nr from extra where user_id =%s ''',[target])
        number_of_ratings=cursor.fetchall()[0]['nr']
        print(number_of_ratings)
        cursor.execute('''update rating set rating=%s where from_id =%s and to_id=%s''', (stars,session['user_id'],target))
        con.commit()
        cursor.execute('''select rating from extra where user_id =%s ''',[target])
        rating=cursor.fetchall()[0]['rating']
        print(rating)
        rating =rating + (stars-stars_vechi)/number_of_ratings
        cursor.execute('''update extra set rating=%s where user_id=%s''', (rating,target))
        con.commit()
        return 0
       