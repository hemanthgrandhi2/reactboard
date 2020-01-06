from flask import Flask
from flask import request
from flask import jsonify
from pymongo import MongoClient
import pymongo
import json
from bson import json_util
from bson.json_util import dumps
from flask_cors import CORS

myclient = pymongo.MongoClient("mongodb://admin:admin@pwc-iot-cluster-shard-00-00-xiwbi.mongodb.net:27017,pwc-iot-cluster-shard-00-01-xiwbi.mongodb.net:27017,pwc-iot-cluster-shard-00-02-xiwbi.mongodb.net:27017/test?ssl=true&replicaSet=Pwc-IoT-Cluster-shard-0&authSource=admin&retryWrites=true")
mydb = myclient["Pwc-IoT-Database"]
mycol = mydb["Device01"]

app = Flask(__name__)
if __name__ == '__main__':
    app.run(debug=True)
cors = CORS(app)

@app.route("/temperature", methods = ['GET'])
def temperature():
    try:
        x = mycol.find({"TEMPERATURE":{"$exists": "true"}}, {"TEMPERATURE": 1,"DATE": 1, "TIME" : 1})
        return dumps(x)
    except e:
        return dumps({'error': str(e)})

@app.route("/waterlevel", methods = ['GET'])
def water_level():
    try:
        x = mycol.find({"WATER LEVEL":{"$exists": "true"}}, {"WATER LEVEL": 1,"DATE": 1, "TIME" : 1})
        return dumps(x)
    except e:
        return dumps({'error': str(e)})

@app.route("/flowpulse", methods = ['GET'])
def flow_pulse():
    try:
        x = mycol.find({"FLOW PULSE":{"$exists": "true"}}, {"FLOW PULSE": 1,"DATE": 1, "TIME" : 1})
        return dumps(x)
    except e:
        return dumps({'error': str(e)})

@app.route("/error", methods = ['GET'])
def error_code():
    try:
        x = mycol.find({"ERROR CODE":{"$exists": "true"}}, {"ERROR CODE": 1,"DATE": 1, "TIME" : 1}).sort([{"_id",-1}])
        return dumps(x)
    except e:
        return dumps({'error': str(e)})

@app.route("/latlong", methods = ['GET'])
def latitude_longitude():
    try:
        x = mycol.find({"LATTITUDE":{"$exists": "true"}, "LONGITUDE": {"$exists": "true"}}, {"LATTITUDE": 1,"LONGITUDE": 1, "DATE": 1, "TIME" : 1}).sort([("DATE", -1), ("TIME", -1)]).limit(1)
        return dumps(x)
    except e:
        return dumps({'error': str(e)})

@app.route("/sigstrength", methods = ['GET'])
def signal():
    try:
        x = mycol.find({"SIGNAL STRENGTH":{"$exists": "true"}}, {"SIGNAL STRENGTH": 1, "DATE": 1, "TIME" : 1}).sort([("DATE", -1), ("TIME", -1)]).limit(1)
        return dumps(x)
    except e:
        return dumps({'error': str(e)})

@app.route("/checkdev", methods = ['GET'])
def check_device_status():
    try:
        x = mycol.find({"SIGNAL STRENGTH":{"$exists": "true"}}, {"DATE": 1, "TIME" :1, "SIGNAL STRENGTH": 1 }).sort([("_id", -1)]).limit(1)
        return dumps(x)
    except e:
        return dumps({'error': str(e)})
