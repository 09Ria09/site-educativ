import unicodedata
import hashlib
SPECIAL= [',','.','-','_']
PAS=" !#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
MAIL="!#$%&'*+-/=?^_`{|}~@."

#USE NFC FOR COMPARING AND NFD FOR PROCESSING

#Only for comparisons
def nfc(s):
    return unicodedata.normalize("NFC",s) 
#Only for Prpcessing

def nfd(s):
    return unicodedata.normalize("NFD",s) 

def valid(s,special):
    if not len(s):
        return False
    for c in s:
        if not c in special and not c.isalnum() : return False
    return True

def mailValid(mail):
    if valid(mail,MAIL) and mail.count('@')==1 and mail.count('..')==0 : return 1
    return 0

def validareUE(usernameOrEmail,password):
    erori={}
    if usernameOrEmail.count('@') == 0:
        if not valid(usernameOrEmail,SPECIAL): erori["usernameInvalid"]=True
    else :
        if not mailValid(usernameOrEmail): erori["mailInvalid"]=True
    if not valid(password,PAS): erori["passwordInvalid"]=True
    return erori

def validare(username,nume,prenume,mail,password,passwordAgain):
    erori={}
    if not valid(username,SPECIAL): erori["usernameInvalid"]=True
    if not valid(nume,SPECIAL): erori["numeInvalid"]=True
    if not valid(prenume,SPECIAL): erori["prenumeInvalid"]=True
    if not valid(password,PAS): erori["passwordInvalid"]=True
    if not nfd(password)==nfd(passwordAgain): erori["passwordMismatch"]=True
    if not mailValid(mail): erori["mailInvalid"]=True
    return erori

def hashPas(password):
    return hashlib.sha512(password.encode()).hexdigest()
