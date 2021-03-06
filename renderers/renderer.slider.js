(function () {
    var renderer = Retina.Renderer.extend({
	about: {
	    name: "slider",
	    title: "Slider",
            author: "Tobias Paczian",
            version: "1.0",
	    requires: [],
	    defaults: {
		'width' : 400,
		'height': 10,
		'color': "#08c",
		'sliderWidth': 12,
		'min': -100,
		'max': 100,
		'current': 0,
		'showValue': true,
		'fontName': 'Arial',
		'fontSize': '12px',
		'fontColor': 'gray'
	    },
	},
	exampleData: function () {
	    return "";
        },
	render: function () {
	    renderer = this;
	    var index = renderer.index;

	    var container = document.createElement('div');
	    container.setAttribute('style', "width: "+renderer.settings.width + "px; height: "+renderer.settings.height+"px;");

	    var workWidth = renderer.settings.width - 4 - (renderer.settings.showValue ? 30 : 0);
	    renderer.workWidth = workWidth;
	    var middle = parseInt(workWidth / (renderer.settings.max - renderer.settings.min) * (renderer.settings.current - renderer.settings.min));
	    var rightWidth = parseInt(workWidth - middle - (renderer.settings.sliderWidth / 2));
	    var leftWidth = workWidth - rightWidth - renderer.settings.sliderWidth;

	    var sliderLeft = document.createElement('div');
	    sliderLeft.setAttribute('style', "float: left; border: 1px solid gray; border-right: none; background-color: lightgray; width: "+leftWidth+"px; height: "+parseInt(renderer.settings.height / 5 * 3)+"px; margin-top: "+parseInt(renderer.settings.height / 5)+"px;");
	    var slider = document.createElement('div');
	    slider.setAttribute('instance', renderer.index);
	    slider.setAttribute('style', "cursor: pointer; float: left; width: "+renderer.settings.sliderWidth+"px; height: 100%; border-radius: 3px; border: 1px solid gray; background-color: "+renderer.settings.color+";");
	    slider.setAttribute("title", renderer.settings.current);
	    var sliderRight = document.createElement('div');
	    sliderRight.setAttribute('style', "float: left; border: 1px solid gray; border-left: none; width: "+rightWidth+"px; height: "+parseInt(renderer.settings.height / 5 * 3)+"px; margin-top: "+parseInt(renderer.settings.height / 5)+"px;");
	    renderer.leftSlider = sliderLeft;
	    renderer.rightSlider = sliderRight;
	    renderer.slider = slider;

	    var start;
	    var wA;
	    var wB;
	    function startSlideMouse(evt) {
		start = evt.pageX;
		wA = parseInt(slider.previousSibling.style.width);
		wB = parseInt(slider.nextSibling.style.width);
		jQuery(document)
		    .on("mousemove", doSlideMouse)
		    .on("mouseup", endSlideMouse);
	    }
	    function doSlideMouse(evt) {
		if (((wA - (start - evt.pageX)) < 0) || ((wB + (start - evt.pageX)) < 0)) {
		    return;
		} 
		slider.previousSibling.style.width = (wA - (start - evt.pageX)) + "px";
		slider.nextSibling.style.width = (wB + (start - evt.pageX)) + "px";
		slider.setAttribute('title', Retina.RendererInstances.slider[slider.getAttribute('instance')].currentValue(slider.getAttribute('instance')));
	    }
	    function endSlideMouse(evt) {
		jQuery(document)
		    .off("mousemove", doSlideMouse)
		    .off("mouseup", endSlideMouse);
		Retina.RendererInstances.slider[slider.getAttribute('instance')].slid(slider.getAttribute('instance'));
	    }
	    
	    slider.addEventListener('mousedown', startSlideMouse);

	    container.appendChild(sliderLeft);
	    container.appendChild(slider);
	    container.appendChild(sliderRight);
	    if (renderer.settings.showValue) {
		var valueDiv = document.createElement('div');
		valueDiv.setAttribute('style', 'width: 25px; font-name: '+renderer.settings.fontName+'; font-size: '+renderer.settings.fontSize+'; color: '+renderer.settings.fontColor+'; float: left; position: relative; bottom: 4px; padding-left: 5px; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;');
		valueDiv.innerHTML = renderer.settings.current;
		renderer.valueDiv = valueDiv;
		container.appendChild(valueDiv);
	    }

	    renderer.settings.target.appendChild(container);

	    return renderer;
	},
	slid: function (index) {
	    var renderer = Retina.RendererInstances.slider[index];
	    if (typeof renderer.settings.callback == "function") {
		renderer.settings.callback.call(null, renderer.settings.current);
	    }
	},
	currentValue: function (index) {
	    var renderer = Retina.RendererInstances.slider[index];
	    var w = parseInt(renderer.leftSlider.style.width);
	    var w2 = parseInt(renderer.rightSlider.style.width);
	    if (w == 0) {
		renderer.settings.current = renderer.settings.min;
	    } else if (w2 == 0) {
		renderer.settings.current = renderer.settings.max;
	    } else {
		renderer.settings.current = parseInt(renderer.settings.min + ((renderer.settings.max - renderer.settings.min) / (renderer.workWidth - renderer.settings.sliderWidth) * w));
	    }
	    if (renderer.valueDiv) {
		renderer.valueDiv.innerHTML = renderer.settings.current;
	    }
	    return renderer.settings.current;
	}
    });
    
 }).call(this);
