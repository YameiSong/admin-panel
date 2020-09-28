from flask import Flask, request, jsonify
from flask_cors import CORS  # , cross_origin
from flask_pymongo import PyMongo
from bson import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/accounts"
mongo = PyMongo(app)

CORS(app, support_credentials=True)
db = mongo.db.accounts


@app.route("/", methods=["GET", "POST"])
# @cross_origin(supports_credentials=True)
def getpost():
    if request.method == "GET":
        o = []
        for doc in db.find():
            o.append({
                "_id": str(ObjectId(doc["_id"])),
                "name": doc["name"],
                "email": doc["email"],
                "password": doc["password"]
            })
        return jsonify(o)
    if request.method == "POST":
        id = db.insert({
            "name": request.json["name"],
            "email": request.json["email"],
            "password": request.json["password"]
        })
        return jsonify(str(ObjectId(id)))


@app.route("/getone/<id>", methods=["GET"])
def getone(id):
    doc = db.find_one({"_id": ObjectId(id)})
    doc["_id"] = str(ObjectId(id))
    return jsonify(doc)


@app.route("/<id>", methods=["DELETE", "PUT"])
def deleteput(id):
    if request.method == "DELETE":
        db.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "deleted"})
    if request.method == "PUT":
        db.update(
            {"_id": ObjectId(id)},
            {"$set": {
                "name": request.json["name"],
                "email": request.json["email"],
                "password": request.json["password"]
            }
            }
        )
        return jsonify({"message": "updated"})
