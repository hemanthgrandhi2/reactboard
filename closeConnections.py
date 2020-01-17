from pymongo import MongoClient
import pymongo


myclient = pymongo.MongoClient("mongodb://admin:admin@pwc-iot-cluster-shard-00-00-xiwbi.mongodb.net:27017,pwc-iot-cluster-shard-00-01-xiwbi.mongodb.net:27017,pwc-iot-cluster-shard-00-02-xiwbi.mongodb.net:27017/test?ssl=true&replicaSet=Pwc-IoT-Cluster-shard-0&authSource=admin&retryWrites=true")
mydb = myclient["Pwc-IoT-Database"]
mycol = mydb["Device01"]
myclient.runCommand( { killAllSessions: [ { user: admin, db: mydb }, ... ]  } )