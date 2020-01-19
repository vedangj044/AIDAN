"""
Funtions to create views and visualize each endpoint.
"""

import altair as alt
from vega_datasets import data
import pandas as pd
import time as t

cars = data.cars()

source = pd.DataFrame([
    {"Gates": 1,  "Passengers": 28},
    {"Gates": 3,  "Passengers": 43},
    {"Gates": 5,  "Passengers": 81},
])

c = 10

def update():
    global c
    source.at[2, "Passengers"]=c
    if c>=160:
        return 0
    c+=20

def aleart():
    global c
    if c>=100:
        return 5
    return None;

def color():
    global c
    if c>=150:
        return 'red'
    if c>=100:
        return 'orange'
    return None;
"""
Create types of graph.
"""
def chart1():
    update()

    chart = alt.Chart(source).mark_bar().encode(
        x='Gates',
        y='Passengers',
        # The highlight will be set on the result of a conditional statement
        color=alt.condition(
            alt.datum.Gates == aleart(),  # If the year is 1810 this test returns True,
            alt.value(color()),     # which sets the bar orange.
            alt.value('steelblue')   # And if it's not true it sets the bar steelblue.
        )
    ).properties(width=300)


    return chart.to_dict()

def chart2():
    source = pd.DataFrame([
        {"x": 1,  "y": 28}, {"x": 2,  "y": 55},
        {"x": 3,  "y": 43}, {"x": 4,  "y": 91},
        {"x": 5,  "y": 81}, {"x": 6,  "y": 53},
        {"x": 7,  "y": 19}, {"x": 8,  "y": 87},
        {"x": 9,  "y": 52}, {"x": 10, "y": 48},
        {"x": 11, "y": 24}, {"x": 12, "y": 49},
        {"x": 13, "y": 87}, {"x": 14, "y": 66},
        {"x": 15, "y": 17}, {"x": 16, "y": 27},
        {"x": 17, "y": 68}, {"x": 18, "y": 16},
        {"x": 19, "y": 49}, {"x": 20, "y": 15}
    ])

    area1 = alt.Chart(source).mark_area(
        clip=True,
        interpolate='monotone'
    ).encode(
        alt.X('x', scale=alt.Scale(zero=False, nice=False)),
        alt.Y('y', scale=alt.Scale(domain=[0, 50]), title='y'),
        opacity=alt.value(0.6)
    ).properties(
        width=500,
        height=75
    )

    area2 = area1.encode(
        alt.Y('ny:Q', scale=alt.Scale(domain=[0, 50]))
    ).transform_calculate(
        "ny", alt.datum.y - 50
    )

    return area1 + area2

def chart3():
    source = data.cars()

    # Configure common options
    base = alt.Chart(source).transform_aggregate(
        num_cars='count()',
        groupby=['Origin', 'Cylinders']
    ).encode(
        alt.X('Cylinders:O', scale=alt.Scale(paddingInner=0)),
        alt.Y('Origin:O', scale=alt.Scale(paddingInner=0)),
    )

    # Configure heatmap
    heatmap = base.mark_rect().encode(
        color=alt.Color('num_cars:Q',
            scale=alt.Scale(scheme='viridis'),
            legend=alt.Legend(direction='horizontal')
        )
    )

    # Configure text
    text = base.mark_text(baseline='middle').encode(
        text='num_cars:Q',
        color=alt.condition(
            alt.datum.num_cars > 100,
            alt.value('black'),
            alt.value('white')
        )
    )

    # Draw the chart
    return heatmap + text
