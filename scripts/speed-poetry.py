import pyrebase

config = {
        "apiKey": "AIzaSyBK4FECgegrkbBruffft12qDEj_1Fr8cjg",
        "authDomain": "usamc-1f05d.firebaseapp.com",
        "databaseURL": "https://usamc-1f05d.firebaseio.com",
        "projectId": "usamc-1f05d",
        "storageBucket": "usamc-1f05d.appspot.com",
        "messagingSenderId": "1042225170615",
        "appId": "1:1042225170615:web:141d01558470a4fb89a532",
        "measurementId": "G-QWNWYW4WFS"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
with open("../../secrets/email") as f:
    email = f.read()
with open("../../secrets/password") as f:
    password = f.read()
user = auth.sign_in_with_email_and_password(email, password)
db = firebase.database()
data = {
        "author": "slopey112",
        "content-id": 1,
        "line-numbers": 2,
        "lines": [
            "here is another poem",
            "so please don't sew 'em"
        ],
        "title": "my other poem"
}
db.child("poems").push(data, user['idToken'])
