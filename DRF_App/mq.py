import sys
import time
import random

from Adafruit_IO import MQTTClient


ADAFRUIT_IO_KEY = '1dab7555d11545749748116e77fc4bbe'
ADAFRUIT_IO_USERNAME = 'vedangj'
IO_FEED = 'light'

def connected(client):
    print ('Connected to Adafruit IO! Listening for feed changes...')
    # subscribe to feed in a dashdoard
    client.subscribe('light')

def disconnected(client):
    print ('Disconnect from Adafruit IO!')
    sys.exit(1)

def message(client, feed_id, payload):
    # feed_id or {0} represents the name of the feed in the message to the Adafruit IO service.
    # Payload or {1} represents the value being sent.
    print ('Feed {0} recieved new vaule: {1}'.format(feed_id, payload))

    aleart()

client = MQTTClient(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)

client.on_connect    = connected
client.on_disconnect = disconnected
client.on_message    = message
client.loop_background()
client.connect()

while 1:
    data = client.on_message
