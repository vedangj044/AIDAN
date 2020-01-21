"""
Funtions to create views and visualize each endpoint.
"""

import altair as alt
import pandas as pd
import json
from random import randint as r#...........

a=['#FFFFFF', 'white', 1]#...........
alert_me = False#...........
toggled = False#...........
"""
Start of MQTT
"""
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

    global toggled
    global a
    global alert_me
    if (toggled==False):
        a[0] = "#FFEEDD"
        a[1] = "red"
        a[2] = 0.25
        alert_me = True
        toggled = True
    else:
        a[0] = "#FFFFFF"
        a[1] = "white"
        a[2] = 1
        alert_me = False
        toggled = False

client = MQTTClient(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)

client.on_connect    = connected
client.on_disconnect = disconnected
client.on_message    = message
client.loop_background()
client.connect()

"""
End of MQTT
"""

"""
Create types of graph.
"""
def baggage_belts_data():

    global alert_me#.................
    if alert_me==False:#.................
        data = pd.DataFrame.from_records([#.................
              {"x": "Belt 1", "y": r(1,3), },#.................
              {"x": "Belt 2", "y": r(1,5), },#.................
              {"x": "Belt 3", "y": r(3,7), }#.................
        ])#.................
    else:#.................
        data = pd.DataFrame.from_records([
              {"x": "Belt 1", "y": 10, },
              {"x": "Belt 2", "y": 10, },
              {"x": "Belt 3", "y": 10, }
        ])

    return data

def baggage_belts():
    data = baggage_belts_data()
    bars = alt.Chart(data).mark_bar().encode(
        alt.X('y:Q', title="No. Of Baggages"),
        alt.Y('x:O', title="Belts"),

        color = alt.condition(
            alt.datum.y >= 4,
            alt.value('orange'),
            alt.value('steelblue'),
        ),
    )

    text = bars.mark_text(
        align='center',
        baseline='middle',
        fontSize=20,
        dx=10  # Nudges text to right so it doesn't appear on top of the bar
    ).encode(
        text='y:Q'
    )

    return (bars+text).configure_axis(
        grid=False,
        labelFontSize=18,
        titleFontStyle='Courier', #This can be editted
        titlePadding=13
    ).configure_title(
        fontSize=20,
        font='Helvetica', #This can be editted
        anchor='start',
        color='gray'
    ).configure_view(
        continuousHeight=200,
        continuousWidth=200,
        strokeWidth=4,
        fill=a[0],
        stroke=a[1],
        strokeOpacity=a[2]
    ).properties(title="Arrival baggage belts",height=300)

ts = pd.Timestamp(year = 2011,  month = 11, day = 21,
       hour = 10, second = 49)

data = pd.DataFrame([
    {'date': ts.now(), 'y': 20},
])
def passenger_footfall_data():


    values = pd.DataFrame([{'date': ts.now(), 'y': r(30, 70)}])

    global data

    a=0
    if len(data)>10:
        a=10

    data = data.append(values, ignore_index = True)[a::]
    return data

def passenger_footfall():
    data = passenger_footfall_data()

    return alt.Chart(data).mark_area(
        color="lightblue",
        interpolate='step-after',
        line=True
    ).encode(
        alt.X('date:T', title="Time"),
        alt.Y('y', title="No. Of passengers(%)"),
    ).configure_axis(
        labelFontSize=18,
        titlePadding=15,
        titleFontStyle='Courier' #This can be editted
    ).configure_title(
        fontSize=20,
        font='Calibri', #This can be editted
        anchor='start',
        color='gray'
    ).properties(title="Passenger Footfall",height=300, width=600)

c=0
l=set()
def cout(d):
    global c
    global l
    c+=1

    if c>=100:
        c=0
        b=r(0,1)
        if d in l:
            l.remove(d)
        if b==1:
            l.add(d)
        return b
    else:
        if d in l:
            return 1
        return 0

def available_parking_data():
    data = pd.DataFrame.from_records([
          {"id": 1, "occupied": cout(1)},
          {"id": 2, "occupied": cout(2)},
          {"id": 3, "occupied": cout(3)},
          {"id": 4, "occupied": cout(4)},
          {"id": 5, "occupied": cout(5)},
          {"id": 6, "occupied": cout(6)},
          {"id": 7, "occupied": cout(7)},
          {"id": 8, "occupied": cout(8)},
          {"id": 9, "occupied": cout(9)},
          {"id": 10, "occupied": cout(10)},
          {"id": 11, "occupied": cout(11)},

    ])

    return data

def available_parking():
    data = available_parking_data()
    person = (
        "m 0 0 l 14 -15 a 5 5 0 0 1 9 8 l -14 15 l 9 26 l -4 5 l -12 -22 l -12 12 l 1 5 l -2 3 l -12 -11 l 3 -2 l 5 0 l 9 -14 l -19 -11 l 4 -3 l 22 4"
    )

    bars = alt.Chart(data).transform_calculate(
        row="ceil(datum.id/5)"
    ).transform_calculate(
        col="datum.id - datum.row*5"
    ).mark_point(
        filled=True,
        size=10,
    ).encode(
        x=alt.X("col:O", axis=None),
        y=alt.Y("row:O", axis=None),
        shape=alt.ShapeValue(person),
        color = alt.condition(
            alt.datum.occupied == 1,
            alt.value('orange'),
            alt.value('steelblue'),
        ),
    ).properties(
        width=700,
        height=700,
        title="Available Parking"
    )

    text = bars.mark_text(
        align='center',
        baseline='middle',
        fontSize=25,
        dx=-3,
        dy=-16  # Nudges text to right so it doesn't appear on top of the bar
    ).encode(
        text='id:Q'
    )

    return (bars+text).configure_title(
        fontSize=25,
        font='Calibri', #This can be editted
        anchor='start',
        color='gray'
    ).configure_view(strokeWidth=0)

def boarding_gates_data():
    values=[
        {"continent": "GATE 1", "population": r(1,4)},
        {"continent": "GATE 2", "population": r(2,5)},
        {"continent": "GATE 3", "population": r(3,8)}]

    return values

def boarding_gates():

    f = open('pieChart.json', 'r')
    d = eval(f.read().replace("true", "True"))

    values = boarding_gates_data()

    d['data'][0]['values'] = values
    return d
