from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shop.db'
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(500))

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'price': p.price, 'img': p.image_url} for p in products])

@app.route('/api/send-order', methods=['POST'])
def send_order():
    data = request.json
    items = data.get('items', [])
    total = data.get('total', 0)
    
    # ایمیل تو
    msg = MIMEMultipart()
    msg['From'] = "game.mc.is.here@gmail.com"
    msg['To'] = "game.mc.is.here@gmail.com"
    msg['Subject'] = "سفارش جدید پرتغال شاپ"
    body = f"محصولات: {items}\nجمع کل: {total}"
    msg.attach(MIMEText(body, 'plain'))
    
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login("game.mc.is.here@gmail.com", "ockyyrzlxsipssdv")
        server.sendmail("game.mc.is.here@gmail.com", "game.mc.is.here@gmail.com", msg.as_string())
        server.quit()
        return jsonify({"status": "success"})
    except:
        return jsonify({"status": "error"}), 500

if name == '__main__':
    app.run(debug=True)
