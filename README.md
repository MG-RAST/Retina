# retina & stm

Retina is a javascript webframework. It uses the short term memory
(stm) module to provide an organized storage of data within the client
memory. It supports the concepts of renderers and widgets.

A renderer is an independent visualization library that given data and
a DOM target renders the data within the target element. It has no
concept or knowledge of its surroundings and simply renders the data
given to it. It expects the data to be in the format it requires and
makes no assumptions about the rendering space given to it. A renderer
can be parameterized and offer an arbitrary amount of options,
including callback functions to events captured by the renderer. It
offers useful defaults for all parameters. An example of a renderer
would be a piechart, a table or a three-dimensional graph.

A widget is a component that handles the flow of the application and
data for a specific task. It uses the stm to retrieve the data and to
store the intermediate data products. It prepares the data in such a
way that it can be used by chosen renderers to display and offer a
user interface to transform it. Widgets can call other widgets to
compartmentalize large application blocks.

stm is a client side storage for data. It represents the data in a
JSON object of data types, each being a list of data ids, which in
turn point at the individual data objects. The data can be retrieved
from a REST API, put in directly via javascript calls or be loaded
from a file. STM provides callback functions for asynchronously
retrieved data.

Retina also provides a set of convenience functions for formatting and
commonly used operations on data. Retina uses jQuery and Bootstrap for
code and style convenience.

To get started take a look at the [Wiki](../../wiki). It contains tutorials, a list
of pre-built renderers and widgets and a reference to all included
functions in both retina and stm.
