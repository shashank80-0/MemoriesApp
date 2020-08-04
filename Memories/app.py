from flask import Flask, render_template, redirect, url_for, request, session
from flask_sqlalchemy import SQLAlchemy
import time

app = Flask(__name__)

app.config ['SQLALCHEMY_DATABASE_URI'] = ('mysql+pymysql://shashank8000:C5h82a7D6Yr74@db4free.net:3306/memories_app_db')
app.config ['SQLALCHEMY_ECHO'] = False
app.config ['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config ['SECRET_KEY'] = 'AldAjSVhWCwhVnHx8LoX'

db=SQLAlchemy(app)

class story(db.Model):
    story_id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    image = db.Column(db.LargeBinary,nullable=False)
    name = db.Column(db.String,nullable=False)
    description = db.Column(db.String,nullable=False)
    date = db.Column(db.DateTime,nullable=False)
    location = db.Column(db.String,nullable=False)

class users(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email_addr = db.Column(db.String, nullable=False, unique=True)
    passwd = db.Column(db.String,nullable=False)

class owner(db.Model):
    story_id = db.Column(db.Integer,db.ForeignKey(story.story_id),primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(users.user_id),primary_key=True)

db.create_all()

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['POST','GET'])
def login():
    message = None
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        emailId = request.form['email-id']
        password = request.form['password']
        user = users.query.filter_by(email_addr = emailId).first()
        if(user is None):
            message = """Incorrect Email Id"""
            return render_template('login.html', message = message)
        elif(user.passwd != password):
            message = """Incorrect Password"""
            return render_template('login.html', message = message)
        else:
            session['userId'] = user.user_id 
            return redirect(url_for('home'))

@app.route('/signup', methods=['POST','GET'])
def signup():
    message = None
    if request.method == 'GET':
        return render_template('signup.html')
    elif request.method == 'POST':
        emailId = request.form['email-id']
        password = request.form['password']
        confirmPassword = request.form['confirm-password']
        if(emailId == '' or password == '' or confirmPassword == ''):
            message = """One or more fields are empty!"""
            return render_template('signup.html',message = message)
        elif(password!=confirmPassword):
            message = """Passwords do not match!"""
            return render_template('signup.html', message = message)
        elif(users.query.filter_by(email_addr = emailId).first() is not None):
            message = """Email address is already registered!"""
            return render_template('signup.html', message = message)
        else:
            user = users(email_addr = emailId,
                         passwd = password)
            db.session.add(user)
            db.session.commit()
            message = """User has been created!"""
            time.sleep(2)
            return redirect(url_for('login'))


@app.route('/add',methods=['POST'])
def add():
    storyImage = request.files['story-image']
    storyName = storyImage.filename
    storyDescription = request.form['story-description']
    storyTime = request.form['story-time']
    storyLocation = request.form['story-location']
    tempStory = story(image=storyImage.read(),
                      name = storyName,
                      description=storyDescription,
                      date=storyTime,
                      location=storyLocation
                      )
    db.session.add(tempStory)
    db.session.commit()
    print(storyImage.filename)
    return storyImage.filename



if __name__ == '__main__':
    app.run()

