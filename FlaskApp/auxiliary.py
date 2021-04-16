import os
import uuid

from werkzeug.utils import secure_filename

import ver as v


def upload_wrapper(app, request, where):
    if where == "profil":
        file = request.files['file']
        return upload(app, request, file, where)
    elif where == "postare":
        files = request.files.getlist('file')
        erori = {}
        for file in files:
            data = upload(app, request, file, where)
            temp = data["erori"]
            erori = {**erori, **tmp}
        return erori
    else:
        print("Second parameter is either /'profil/' or /'postare/'")
        return 0


def upload(app, request, file, where):
    erori = {}
    tip = 'invalid'
    path = ''
    if file.filename == '' or not file:
        print('Nu s-a trimis nimic')
        erori['noFile'] = True
    if erori == {}:
        temp = v.file_type(file.filename)
        tip = temp[1]
        print(tip)
        if tip == 'invalid':
            erori['tipInvalid'] = True
        if where == 'profil':
            path = 'assets/images/icons'
        elif where == 'postare':
            path = 'assets/images/posts' if tip == 'pic' else 'assets/videos/posts'
        nume = secure_filename(uuid.uuid4().hex) + '.' + temp[1]
        path = os.path.join(path, nume)
        erori['test'] = tip
        if file:
            file.save('./static/' + path)
        else:
            return 0
    return {'erori': erori, 'tip': tip, 'path': path}
