"""
Funtions to create views and visualize each endpoint.
"""

import altair as alt
import pandas as pd
import json

"""
Create types of graph.
"""
def baggage_belts_data():
    data = pd.DataFrame.from_records([
          {"x": "Belt 1", "y": 1, },
          {"x": "Belt 2", "y": 2, },
          {"x": "Belt 3", "y": 4, }
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
    ).properties(title="Arrival baggage belts",height=300)


def passenger_footfall_data():
    data = pd.DataFrame([
        {'date': '2010-01-01T00:00:00', 'y': 20},
        {'date': '2010-01-01T00:01:00', 'y': 27},
        {'date': '2010-01-01T00:02:00', 'y': 20},
        {'date': '2010-01-01T00:03:00', 'y': 40},
        {'date': '2010-01-01T00:04:00', 'y': 60},
        {'date': '2010-01-01T00:05:00', 'y': 70},
    ])

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

def available_parking_data():
    data = pd.DataFrame.from_records([
          {"id": 1, "occupied": 1},
          {"id": 2, "occupied": 0},
          {"id": 3, "occupied": 0},
          {"id": 4, "occupied": 0},
          {"id": 5, "occupied": 0},
          {"id": 6, "occupied": 0},
          {"id": 7, "occupied": 0},
          {"id": 8, "occupied": 1},
          {"id": 9, "occupied": 0},
          {"id": 10, "occupied": 1},
          {"id": 11, "occupied": 0},

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
        size=30,
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
        {"continent": "GATE 1", "population": 1},
        {"continent": "GATE 2", "population": 4},
        {"continent": "GATE 3", "population": 7}]

    return values

def boarding_gates():

    f = open('pieChart.json', 'r')
    d = eval(f.read().replace("true", "True"))

    values = boarding_gates_data()

    d['data'][0]['values'] = values
    return d
