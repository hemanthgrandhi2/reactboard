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

x = mycol.find({"TEMPERATURE":{"$exists": "true"}}, {"TEMPERATURE": 1,"DATE": 1, "TIME" : 1})
print(x)


