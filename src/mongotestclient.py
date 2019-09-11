from flask import Flask
from flask import request
from pymongo import MongoClient
from bson.json_util import dumps
import json

client = MongoClient("mongodb://admin:admin@pwc-iot-cluster-shard-00-00-xiwbi.mongodb.net:27017,pwc-iot-cluster-shard-00-01-xiwbi.mongodb.net:27017,pwc-iot-cluster-shard-00-02-xiwbi.mongodb.net:27017/test?ssl=true&replicaSet=Pwc-IoT-Cluster-shard-0&authSource=admin&retryWrites=true")
db = client["mydatabase"]
col = db["customers"]

app = Flask(__name__)

@app.route("/get_data", methods = ['GET'])
def get_data():
    try:
        a="test123"
        # myquery = { "TEMPERATURE": { "$gt": "S" } }
        # mydoc = col.find(myquery)
        # cursor = col.find({})
        # for document in cursor:
        #     a.append(document)
        # print(a)
        # print(x)
        # data = json.loads(request.data)
        # user_name = data['name']
        # user_contact = data['contact']
        # if user_name and user_contact:
        #     status = db.Contacts.insert_one({
        #         "name" : user_name,
        #         "contact" : user_contact
        #     })
        return dumps({'message' : a })
    except Exception:
        return dumps({'error' : "error"})


if (__name__ =='__main__'):
    app.run(debug=True)