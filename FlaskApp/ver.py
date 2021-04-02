import unicodedata
import hashlib

SPECIAL = [',', '.', '-', '_']
PAS = " !#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
MAIL = "!#$%&'*+-/=?^_`{|}~@."


# USE NFC FOR COMPARING AND NFD FOR PROCESSING

# Only for comparisons
def nfc(s):
    return unicodedata.normalize("NFC", s)


# Only for Prpcessing

def nfd(s):
    return unicodedata.normalize("NFD", s)


def valid(s, special):
    if not len(s):
        return False
    for c in s:
        if c not in special and not c.isalnum():
            return False
    return True


def mail_valid(mail):
    if valid(mail, MAIL) and mail.count('@') == 1 and mail.count('..') == 0:
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
