import paho.mqtt.client as mqtt
import pymongo
import json




myclient = pymongo.MongoClient("mongodb://admin:admin@pwc-iot-cluster-shard-00-00-xiwbi.mongodb.net:27017,pwc-iot-cluster-shard-00-01-xiwbi.mongodb.net:27017,pwc-iot-cluster-shard-00-02-xiwbi.mongodb.net:27017/test?ssl=true&replicaSet=Pwc-IoT-Cluster-shard-0&authSource=admin&retryWrites=true")
mydb = myclient["Pwc-IoT-Database"]
mycol = mydb["Device01"]
# Define event callbacks
def on_connect(mosq, obj, rc):
    print ("on_connect:: Connected with result code "+ str ( rc ) )
    print("rc: " + str(rc))
    # print("" )

def on_message(mosq, obj, msg):
    # print ("on_message:: this means  I got a message from brokerfor this topic")
    # print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))
    a=msg.payload
    b = json.loads(a.decode('utf-8'))
    print(b)
    # c = sys.getsizeof(a)
    # print(c)    
    mycol.insert_one(b)
    # print ("")

def on_publish(mosq, obj, mid):
    #print("mid: " + str(mid))
    print ("")

def on_subscribe(mosq, obj, mid, granted_qos):
    print("This means broker has acknowledged my subscribe request")
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(mosq, obj, level, string):
    print(  string)

def on_disconnect(mqttc, userdata, rc):
    if rc != 0:
        print(" Unexpected disconnection")
    while(True):
        try:
            print("Trying to Reconnect")
            mqttc.connect('m16.cloudmqtt.com', 16242, 60)
            break
        except:
            print("Error in Retrying to Connect with Broker")
            continue


client = mqtt.Client(client_id="testDevice")
# Assign event callbacks
client.on_message = on_message
client.on_connect = on_connect
client.on_publish = on_publish
client.on_subscribe = on_subscribe
client.on_disconnect = on_disconnect
# Uncomment to enable debug messages
client.on_log = on_log


# user name has to be called before connect - my notes.
client.username_pw_set("qnxgdjco", "1g8pZZ_N9LT8")

client.connect('m16.cloudmqtt.com', 16242, 60)
# Continue the network loop, exit when an error occurs
#rc = 0
#while rc == 0:
#    rc = client.loop()
#print("rc: " + str(rc))

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface
# client.loop_forever()
client.loop_start()
client.subscribe ("test/pwc" ,0 )


run = True
while run:
    client.on_message


