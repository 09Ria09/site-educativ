
import hashlib
import json
import unicodedata

SPECIAL = [',', '.', '-', '_']
PAS = " !#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
MAIL = "!#$%&'*+-/=?^_`{|}~@."
PICS = {'png', 'jpg', 'jpeg', 'gif'}
VIDS = {'mp4', 'ogg', 'webm'}
DOCS = {'docx', 'pdf'}


# USE NFC FOR COMPARING AND NFD FOR PROCESSING

# Only for comparisons
def nfc(s):
    return unicodedata.normalize("NFC", s)


# Only for Prpcessing

def nfd(s):
    return unicodedata.normalize("NFD", s)


def normalizare_email(email):
    elements = email.split('@')
    nume = elements[0].split('.')
    nume_normalizat = ''.join(map(str, nume)) + '@' + elements[1]
    return nume_normalizat


def valid(s, special):
    if not len(s):
        return False
    for c in s:
        if c not in special and not c.isalnum():
            return False
    return True


def verificare_text(txt):
    lenght = len(txt)
    if not lenght or lenght > 2048:
        return False
    for ch in txt:
        if not ch.isalnum() and ch not in PAS:
            return False
    return True


def mail_valid(mail):
    if mail.count('@') == 1:
        cuv = mail.split('@')
        if valid(mail, MAIL) and len(cuv[0]) <= 64 and not mail.count('..') and cuv[1].count('.') >= 1:
            return 1
    return 0


def validare_ue(username_or_email, password):
    erori = {}
    if username_or_email.count('@') == 0:
        if not valid(username_or_email, SPECIAL):
            erori["usernameInvalid"] = True
    else:
        if not mail_valid(username_or_email):
            erori["mailInvalid"] = True
    if not valid(password, PAS):
        erori["passwordInvalid"] = True
    return erori


def validare(username, nume, prenume, mail, password, password_again):
    erori = {}
    if not valid(username, SPECIAL):
        erori["usernameInvalid"] = True
    if not valid(nume, SPECIAL):
        erori["numeInvalid"] = True
    if not valid(prenume, SPECIAL):
        erori["prenumeInvalid"] = True
    if not valid(password, PAS):
        erori["passwordInvalid"] = True
    if not nfd(password) == nfd(password_again):
        erori["passwordMismatch"] = True
    if not mail_valid(mail):
        erori["mailInvalid"] = True
    return erori


def hash_pas(password):
    return hashlib.sha512(password.encode()).hexdigest()


def verify_profile(mysql, session, rq):
    tmp = {'valid': True}
    invalid = False
    if 'username' in rq:
        tmp = {**tmp, **verify_profile_helper(mysql, session, 'username', rq['username'])}
    if not tmp['valid']:
        invalid = True
    if 'descriere' in rq:
        tmp = {**tmp, **verify_profile_helper(mysql, session, 'descriere', rq['descriere'])}
    if not tmp['valid']:
        invalid = True
    if 'materii' in rq:
        tmp = {**tmp, **verify_profile_helper(mysql, session, 'materii', rq['materii'])}
    tmp['valid'] &= (not invalid)
    return tmp


def verify_profile_helper(mysql, session, ptype, value):
    tmp = {'valid': True}

    if session.get('user_id') is None:
        tmp['valid'] = False
        return tmp

    cursor = mysql.connection.cursor()
    con = mysql.connection

    if ptype == 'username':
        if not valid(value, SPECIAL):
            tmp['valid'] = False
            tmp['invalidUN'] = 'Username-ul este invalid.'
            return tmp

        cursor.execute('''select username from users where id=%s;''', [session.get('user_id')])
        if cursor.fetchall()[0]['username'] == value:
            return tmp

        cursor.execute('''select id from users where username=%s;''', [nfc(value)])
        if cursor.fetchall() != ():
            tmp['valid'] = False
            tmp['invalidUN'] = 'Există deja un alt cont cu acest username.'
            return tmp

    elif ptype == 'descriere':
        if len(json.dumps(value, ensure_ascii=False)) > 2048:
            tmp['valid'] = False
            tmp['invalidD'] = 'Textul este prea lung.'
            return tmp

    elif ptype == 'materii':
        if len(json.dumps(value, ensure_ascii=False)) > 512:
            tmp['valid'] = False
            tmp['invalidM'] = 'Prea Multe Taguri.'
            return tmp

    return tmp


def file_type(s):
    s = s.rsplit('.', 1)[1].lower()
    if s in PICS:
        return ['pic', s]
    elif s in VIDS:
        return ['vid', s]
    elif s in DOCS:
        return ['doc', s]
    else:
        return ["invalid", s]
