<h1>Retina & stm</h1>

<h2>OVERVIEW</h2>

<p>Retina is a webframework to support dynamic usage of reusable web components. It uses the short term memory (stm) module to provide an organized storage of data within the client memory. In Retina there are two component concepts - renderers and widgets.</p>

<p>A renderer is an independent visualization library that given data and a DOM target renders the data within the target element. It has no concept or knowledge of its surroundings and simply renders the data given to it. It expects the data to be in the format it requires and makes no assumptions about the rendering space given to it. A renderer can be parameterized and offer an arbitrary amount of options, including callback functions to events captured by the renderer. It offers useful defaults for all parameters. An example of a renderer would be a piechart, a table or a three-dimensional graph.</p>

<p>A widget is a component that handles the flow of data for a specific task. It uses the stm to retrieve the data and to store the intermediate data products. It prepares the data in such a way that it can be used by chosen renderers to display and offer a user interface to transform it.</p>

<p>STM is a client side storage for data. It represents the data in a JSON hash of data types, each being a list of data ids, which in turn point at the individual data objects. The data can be retrieved from a REST API, put in directly via javascript calls or be loaded from a file. STM provides callback functions for asynchronously retrieved data.</p>

<h2>USAGE</h2>

<h3>HTML setup</h3>

<p>First you should set up a basic HTML page to initialize the modules. We use bootstrap basic layouting functionality. In the head section of the document, link the required libraries:</p>

<pre>
      <!--external javascript files-->
      <script type="text/javascript" src="jquery.min.js"></script>
      <script type="text/javascript" src="jquery-ui.min.js"></script>
      <script type="text/javascript" src="bootstrap.min.js"></script>
      <script type="text/javascript" src="html2canvas.min.js"></script>
      
      <!--basic javascript files-->
      <script type="text/javascript" src="stm.js"></script>
      <script type="text/javascript" src="retina.js"></script>
      
      <!--bootstrap style-->
      <link rel="stylesheet" type="text/css" href="bootstrap.css">
      <link rel="stylesheet" type="text/css" href="bootstrap-responsive.css">
      <link rel="stylesheet" type="text/css" href="jquery.ui.all.css">
</pre>

<p>Then use a jQuery function call to set up Retina and stm:</p>

<pre>
     <!--initialization-->
     <script type="text/javascript">
     	     jQuery(function () {
	          stm.init('URL_TO_API').then(function() {
		       Retina.init( { renderer_resources: [ LIST_OF_RESOURCE_PROVIDERS ], library_resource: LOCATION_OF_LIBRARY_FILES, widget_resources: [ LIST_OF_WIDGET_RESOURCES ] } ).then( function () {
		            Retina.load_widget("myWidget").then( function () {
			         Retina.Widget.myWidget.create(DIV_TO_RENDER_IN);
			    });
		       });
 		  });
	      });
    </script>
</pre>

<p>Then in the body of the HTML page simply place a div with the id passed to the widget you want to display. Note that you can use an arbitrary amount of widgets on the page. You can also directly use a renderer if you wish.</p>

<h2>STM - FUNCTIONS</h2>

<h3>init(repository)</h3>

<p>Initializes the stm, optionally setting a default repository. If stm was already set up, this will purge all data in the storage. This function must be called before any operations with stm can occur.</p>

<h3>repository(name, attribute)</h3>

<p>If called without parameters, returns the hash of all repositories in the stm. If called with a repository name, returns a reference to that repository object or null if the repository does not exist. If called with a name and a attribute, will return the value of that attribute of the respository.</p>

<h3>add_repository(repository_url)</h3>

<p>Adds a repository to the stm. The URL must point to a self describing REST API that needs to return a name in the attribute 'service' and a list of resources in the attribute 'resources'. Each resource must be a tuple of name and url, where the name is the name of the resource and the url points to a self description of the resource. If the repository is the first to be added to the current stm instance, it will be set to be the default repository.</p>

<h3>remove_repository(repo_name)</h3>

<p>Removes a repository from the repository list of stm.</p>

<h3>default_repository(repo_name)</h3>

<p>If a repository name is passed, it will be set to be the default repository. The function always returns a reference to the current default repository.</p>

<h3>load_data({data, no_clear, type})</h3>

<p>If data is an array, each element in it will be added as a data instance under the data type passed in the type parameter. If data is a single object, that will be added as a single data instance under the data type passed in the type parameter. If data is a string, it will be interpreted as the id of a DOM element, whose innerHTML property will be JSON.parsed and added as data in the same manner as data passed directly. The innerHTML of the DOM element passed will be emptied, unless the parameter no_clear is set to true.</p>

<h3>file_upload</h3>

<p>If this function is set as the onchange event of a input type file HTML element, any file selected by the user with that file browse diablog will be attempted to be loaded into the storage. The contents of the file will JSON.parsed and must have the same structure as the storage (a hash of types, each pointing to a hash of ids, each pointing to an object instance). This function can be used to load a dump of the storage back into memory. Note that existing data in the storage will not be cleared, the data will simply be added.</p>

<h3>get_objects({repository, type, id, options})</h3>

<p>This will retrieve one or more objects from the speciefied repository. The function returns a promise, which is fulfilled once the data is loaded into the storage. If no repository is passed, the default repository will be used. The stm will make an api call, using the repositories base url, appending the type and optioanl id as path parameters. Options will be passed as query parameters. All returned data objects will be put into the storage organized under the type passed in the type parameter.</p>

<h3>delete_object(type, id)</h3>

<p>Deletes the object identified by type and id from the storage.</p>

<h3>delete_objects(type, ids)</h3>

<p>Deletes the objects identified by the type and the list of ids from the storage.</p>

<h3>delete_object_type(type)</h3>

<p>Deletes all instances of the specified data type from the storage.</p>

<h2>Retina - FUNCTIONS</h2>

<h3>init({renderer_resources, widget_resources, library_resource})</h3>

<p>Initializes the Retina instance. All passed parameters are optional.</p>

<h3>each(array, function)</h3>

<p>Executes the function on each of the elements of the array passed.</p>

<h3>values(object)</h3>

<p>Returns all attribute values of the object passed as an array.</p>

<h3>keys(object)</h3>

<p>Returns all keys of an object as an array.</p>

<h3>require(library_name)</h3>

<p>If the javascript library identified by the name passed is not yet loaded into the page, it will be asynchronously loaded. The function will return a promise which is fulfilled once the library is loaded.</p>

<h3>capitalize(string)</h3>

<p>Returns the passed string with the first character capitalized.</p>

<h3>mouseCoords(event)</h3>

<p>Returns an object with x and y attributes, containing the absolute mouse position of the event passed, relative to the top left of the document (including scrolls).</p>

<h3>query_renderer_resource(resource)</h3>

<p>Makes an API call to the url of the resource and retrieves the list of available renderers of that resource, adding them to the available_renderers list.</p>

<h3>query_widget_resource(resource)</h3>

<p>Makes an API call to the url of the resource and retrieves the list of available widgets of that resource, adding them to the available_widgets list.</p>

<h3>test_renderer({renderer, target})</h3>

<p>Loads the specified renderer, if not already loaded and has it render its example data into the specified target.</p>

<h3>add_renderer({name, resource, filename})</h3>

<p>Adds a renderer to the available_renderers list. Name must be the name of the renderer, resource must be the base url that provides the renderer code and filename the name of the javscript file holding the code.</p>

<h3>load_renderer(renderer_name)</h3>

<p>Loads a renderer into memory, returning a promise which fulfills once the renderer is loaded.</p>

<h3>add_widget({name, resource, filename})</h3>

<p>Adds a widget to the available_widgets list. Name must be the name of the widget, resource must be the base url that provides the widget code and filename the name of the javscript file holding the code.</p>

<h3>load_widget(widget_name)</h3>

<p>Loads a widget into memory, returning a promise which fulfills once the widget is loaded.</p>

<h3>load_library(library_name)</h3>

<p>Loads a javascript library into memory, returning a promise which fulfills once the script is loaded.</p>