"""
Funtions to create views and visualize each endpoint.
"""

import altair as alt
from vega_datasets import data

cars = data.cars()

chart = alt.Chart(cars).mark_point().encode(
    x='Horsepower',
    y='Miles_per_Gallon',
    color='Origin',
).interactive()


"""
Create types of graph.
"""
