import imghdr
import os
import uuid

import magic
from docx2pdf import convert
from werkzeug.utils import secure_filename

import ver as v

ETM={'video':'vid','images':'img','docs':'doc'}

def list_to_dict(list):
    return dict(zip([num for num in range(0, len(list))], [x for x in list]))


def upload_wrapper(app, request, where,et):
    if where == "profil":
        file = request.files['file']
        return upload(app, request, file, where)
    elif where == "postare":
        files = request
        
        print('sss')
        print(type(files))
        print('sss')
        data = []
        for file in files:
            print(1)
            print(file)
           # data.append(upload(app, request, file, where,et))
        return list_to_dict(data)
    else:
        print("Second parameter is either /'profil/' or /'postare/'")
        return 0


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
            path = 'assets/images/icons'
            if tip != 'pic':
                erori['tipInvalid'] = True
        elif where == 'postare':
            if tip == "pic":
                path = 'assets/images/posts'
            elif tip == "vid":
                path = 'assets/videos/posts'
            elif tip == "doc":
                path = "assets/docs/posts"
            else:
                path = "assets/texts/posts"
        nume = secure_filename(uuid.uuid4().hex) + '.' + temp[1]
        path = os.path.join(path, nume)
        erori['test'] = tip
        if file and not erori['tipInvalid']:
            file_path = './static/' + path
            file.save(file_path)
            file_path = os.path.join(app.static_folder, path)
            file_path = file_path.replace('\\', '/')
            print(file_path)
            if tip == "invalid":
                if magic.from_file(file_path, mime=True) != 'text/plain':
                    os.remove(file_path)
                    erori['tipInvalid'] = True
            elif '.docx' in file.filename:
                convert(file_path)
                os.remove(file_path)

        else:
            return 0
    return {'erori': erori, 'tip': tip, 'path': path}
