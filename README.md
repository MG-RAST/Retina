<h1>Retina & stm</h1>

<h2>OVERVIEW</h2>

<p>Retina is a webframework to support dynamic usage of reusable web components. It uses the short term memory (stm) module to provide an organized storage of data within the client memory. In Retina there are two component concepts - renderers and widgets.</p>

<p>A renderer is an independent visualization library that given data and a DOM target renders the data within the target element. It has no concept or knowledge of its surroundings and simply renders the data given to it. It expects the data to be in the format it requires and makes no assumptions about the rendering space given to it. A renderer can be parameterized and offer an arbitrary amount of options, including callback functions to events captured by the renderer. It offers useful defaults for all parameters. An example of a renderer would be a piechart, a table or a three-dimensional graph.</p>

<p>A widget is a component that handles the flow of data for a specific task. It uses the stm to retrieve the data and to store the intermediate data products. It prepares the data in such a way that it can be used by chosen renderers to display and offer a user interface to transform it.</p>

<p>STM is a client side storage for data. It represents the data in a JSON hash of data types, each being a list of data ids, which in turn point at the individual data objects. The data can be retrieved from a REST API, put in directly via javascript calls or be loaded from a file. STM provides callback functions for asynchronously retrieved data.</p>

<h2>USAGE</h2>

<h3>HTML setup</h3>

<p>First you should set up a basic HTML page to initialize the modules. We use bootstrap basic layouting functionality. In the head section of the document, link the required libraries:</p>

```html
      <!--external javascript files-->
      <script type="text/javascript" src="jquery.min.js"></script>
      <script type="text/javascript" src="bootstrap.min.js"></script>
      
      <!--basic javascript files-->
      <script type="text/javascript" src="stm.js"></script>
      <script type="text/javascript" src="retina.js"></script>
      
      <!--bootstrap style-->
      <link rel="stylesheet" type="text/css" href="bootstrap.css">
```

<p>Then use a jQuery function call to set up Retina and stm:</p>

```html
     <!--initialization-->
     <script type="text/javascript">
     	     jQuery( document ).ready(function(){
	          stm.init({});
		  Retina.init({});
		  Retina.load_widget("myWidget").then( function () {
		       Retina.Widget.myWidget.create("myWidget", { WIDGET PARAMETERS });
		  });
	      });
    </script>
```

<p>Then in the body of the HTML page simply place a div with the id passed to the widget you want to display. Note that you can use an arbitrary amount of widgets on the page. You can also directly use a renderer if you wish.</p>

<h2>STM</h2>

<h3>init(params)</h3>

<p>Initializes the stm, optionally setting default parameters. If stm was already set up, this will purge all data in the storage. This function 
must be called before any operations with stm can occur. Possible parameters are:</p>

<ul>
  <li><b>DataRepositories</b><br>A list of data repositories that can be accessed by the get_objects function. See 'add_repository' for details.</li>
  <li><b>DataRepositoryDefault</b><br>Name of the default data repository to use for the get_objects function.</li>
  <li><b>Authentication</b><br>Authentication string to be used for the get_objects function.</li>
  <li><b>AuthHeaderName</b><br>Name of the header porperty to hold the authentication string. Default is 'AUTH'.</li>
  <li><b>Data</b><br>Initial data to be present in the storage. See 'import_data' for details.</li>
  <li><b>SourceOrigin</b><br>The allowed source origin for trans-frame messaging. Default is '*'.</li>
  <li><b>TargetOrigin</b><br>The allowed target origin for trans-frame messaging. Default is '*'.</li>
  <li><b>useDB</b><br>Boolean whether data should be loaded from indexedDB if available. If set to true the database name can be passed as parameter dbName. If this option is used, the function returns a promise which is fulfilled once the data is loaded. Default is false.</li>
  <li><b>dbName</b><br>Name of the indexedDB database to load the data from. This option is only valid if useDB is set to true. Default is 'stm'.</li>
</ul>

<h3>add_repository(params)</h3>

<p>Adds a repository to the stm. If the repository is the first to be added to the current stm instance, it will be set to be the default repository. The parameters are:</p>

<ul>
    <li><b>url</b><br>Base URL of the data resource.</li>
    <li><b>name</b><br>Name of the resource</li>
    <li><b>description</b><br>(Optional) Description of the resource.</li>
    <li><b>auth</b><br>Boolean whether this resource requires authentication, default is false.</li>
    <li><b>isDefault</b><br>Boolean whether this is the default resource. Default is false.</li>
</ul>

<h3>remove_repository(repo_name)</h3>

<p>Removes a repository from the repository list of stm.</p>

<h3>default_repository(repo_name)</h3>

<p>If a repository name is passed, it will be set to be the default repository. The function always returns a reference to the current default repository.</p>

<h3>import_data(params)</h3>

<p>The import data function accepts three types of data, a list of objects, a hash of objects or a single object instance. The optional parameter 'merge' determines whether a type is replaced if it exists or whether only existing ids will be overwritten.</p>

<h3>file_upload</h3>

<p>If this function is set as the onchange event of a input type file HTML element, any file selected by the user with that file browse diablog will be attempted to be loaded into the storage. The contents of the file will JSON.parsed and must have the same structure as the storage (a hash of types, each pointing to a hash of ids, each pointing to an object instance). This function can be used to load a dump of the storage back into memory. Note that existing data in the storage will not be cleared, the data will simply be added.</p>

<p>This function is suited for loading data dumped by stm.dump</p>

<h3>dump(useDB, dbName)</h3>

<p>Dumps the content of the stm.DataStore to a new window. If the content is saved to a file, it can later be loaded by the file_upload.</p>
<p>If useDB is set to true, the data will be dumped to an indexedDB with the name dbName (default is 'stm'). In this case the function will return a promise that is fulfilled once the data import is complete.</p>

<h3>save_as (data, filename)</h3>

<p>Opens a 'save as' file dialog and stores the data passed under the filename passed.</p>

<h3>get_objects({repository, type, id, options})</h3>

<p>This will retrieve one or more objects from the specified repository. The function returns a promise, which is fulfilled once the data is loaded into the storage. If no repository is passed, the default repository will be used. The stm will make an api call, using the repositories base url, appending the type and optional id as path parameters. Options will be passed as query parameters. All returned data objects will be put into the storage organized under the type passed in the type parameter.</p>

<p>If you want to provide visual feedback on the loading progess from the get_objects function, you can place a div with the id 'progressIndicator' into your page that contains a div with the id 'progressBar'. The indicator will be set to visible when data load occurs. The progressBar field will show the amount of data that has been loaded so far.</p>

<h3>delete_object(type, id)</h3>

<p>Deletes the object identified by type and id from the storage.</p>

<h3>delete_objects(type, ids)</h3>

<p>Deletes the objects identified by the type and the list of ids from the storage.</p>

<h3>delete_object_type(type)</h3>

<p>Deletes all instances of the specified data type from the storage.</p>

<h3>send_data(frame, data, type)</h3>

<p>Sends data to an stm in a different window or iframe. The frame parameter can be either a string with the id of an iframe, an iframe object or a window object. The data parameter must hold a data structure suitable for the stm.DataStore and type defines the data type within the data store that the data should be stored in.</p>

<p>If security is of concern, the allowed source and target origin of the message may be set by changing stm.SourceOrigin and stm.TargetOrigin. The default value for both is '*' (allow to/from any origin). If this is to be changed from the default setting, it must be changed in both source and target window.</p>

<h2>Retina</h2>

<h3>init({renderer_resources, widget_resources, library_resource})</h3>

<p>Initializes the Retina instance. All passed parameters are optional.</p>

<h3>require(library_name, success_callback, error_callback)</h3>

<p>If the javascript library identified by the name passed is not yet loaded into the page, it will be asynchronously loaded. The function will return a promise which is fulfilled once the library is loaded.</p>

<h3>load_renderer({ name: renderer_name, resource: renderer_base_location })</h3>

<p>Loads a renderer into memory, returning a promise which fulfills once the renderer is loaded.</p>

<h3>load_widget({ name: widget_name, resource: widget_base_location })</h3>

<p>Loads a widget into memory, returning a promise which fulfills once the widget is loaded.</p>

<h3>load_library({ name: library_name, resource: library_base_location })</h3>

<p>Loads a javascript library into memory, returning a promise which fulfills once the script is loaded.</p>

<h2>Retina - Convenience functions</h2>

<h3>each(array, function)</h3>

<p>Executes the function on each of the elements of the array passed.</p>

<h3>values(object)</h3>

<p>Returns all attribute values of the object passed as an array.</p>

<h3>keys(object)</h3>

<p>Returns all keys of an object as an array.</p>

<h3>propSort (property, direction)</h3>

<p>Sorts a list of objects by a property in the given direction.</p>

<h3>Numsort(a,b)</h3>

<p>Sorting function for numbers that can be used by the javascript sort function.</p>

<h3>capitalize(string)</h3>

<p>Returns the passed string with the first character capitalized.</p>

<h3>wait (ms)</h3>

<p>Waits for the defined number of milliseconds before it returns.</p>

<h3>date_string</h3>

<p>Returns the current date as the local time string.</p>

<h3>uuidv4</h3>

<p>Returns an RFC4122 complient UUID v4.</p>

<h3>mouseCoords(event)</h3>

<p>Returns an object with x and y attributes, containing the absolute mouse position of the event passed, relative to the top left of the document (including scrolls).</p>

<h3>findPos(DOM object)</h3>

<p>Returns an array with x and y coordinates of the object passed, relative to the top left of the document (including scrolls).</p>

<h3>Base64</h3>

<p>Offers encode and decode functions for Base64 encoding.</p>

<h3>svg2png(source, target, width, height)</h3>

<p>If the source parameter is an SVG element and the target parameter is a container element, this function will render the SVG as a PNG in the target container. The width and height parameters will scale the target image.</p>

<h3>cgiParam (param)</h3>

<p>Returns the value of the cgi parameter.</p>

<h3>dateString (date)</h3>

<p>Returns a neatly formatted string for a time value.</p>

<h2>Retina - Prototype functions</h2>

<h3>Number.formatString</h3>

<p>Formats a number to a fixed number of digits and puts in 1000 separators.</p>

<h3>Number.padLeft</h3>

<p>Prefixes a number with 0s until the defined length is hit.</p>

<h3>Number.byteSize</h3>

<p>Returns a string formatted to show the number of B/KB/MB and such.</p>

<h3>String.hex[Encode|Decode]</h3>

<p>Returns the hexadecimal value of a string or string value of a hexadecimal.</p>

<h3>Array.[max|min]</h3>

<p>Returns the maximum / minimum value inside an array respectively.</p>

<h2>Retina - VARIABLES</h2>

<h3>RendererInstances</h3>

<p>Stores an array of references to all instanciated renderers. Each renderer has a property 'index' which is the index in this array.</p>

<h3>WidgetInstances</h3>

<p>Stores an array of references to all instanciated widgets. Each widget has a property 'index' which is the index in this array.</p>