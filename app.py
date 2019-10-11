from flask import *
from flask_cors import CORS, cross_origin
from twitter import Predictor
from json import *

app = Flask(__name__)
CORS(app)
predictor = Predictor()

@app.route("/my_network")
def network():
    fdata=predictor.predict('DhaarnaSethi')
    return jsonify(fdata)

@app.route("/search_user")
def search():
    user_id=request.args.get("username")
    userdata=predictor.search_user(user_id)
    return jsonify(userdata)

@app.route("/test_text", methods=['POST'])
def test():
    text=request.get_json()["text"]
    fscore=predictor.test_text(text)
    return jsonify(fscore)

@app.route("/block_user")
def block():
    user_id=request.args.get("username")
    predictor.block(user_id)
    return "OK"

@app.route("/check_friendship")
def fship():
    user_id=request.args.get("username")
    target=request.args.get("target")
    fdata=predictor.friendship(user_id, target)
    return jsonify(fdata)

if __name__== "__main__" :
    app.run(host='0.0.0.0',debug=True)
