function ImageSlider(el, options){
	// TODO multiple input possibilities here
	// querySelector, byID, jQuery(), etc.
	this.el = el;
	this.imageslider_css = "display: block;width: 100%;height: auto;top: 0;bottom: 0;left: 0;right: 0;margin: auto;position: absolute;transition:left .75s ease;"
	this.viewingIndex = 0;
	if (options){
		this.opt = options;
	} else {
		this.opt = {
			src: [],	
			interval: 3000	
		};
	}

	// Defaults
	if (!options.interval){
		this.opt.interval = 3000;
	}

	el.style.overflow = "hidden"
}

/* Append a new Image to the ImageSlider Object. */
ImageSlider.rebuild = function(el,src,callback){
	var imgNode = document.createElement("img");
	imgNode.onload = function(){
		/* When the new Image is loaded, scroll the one already there
		   to the left. The new Image slides to the left at the same time,
		   creating a smooth transition. */
		if (el.childNodes.length > 1){
			el.firstChild.style.left = "-" + el.offsetWidth + "px";
			el.firstChild.classList.remove("active");
			/* Once the fading image has scrolled out of view completely, it
			   has to be removed before the next loadNext() starts. */

			// TODO dirty hax for IE < 9
			el.firstChild.addEventListener("transitionend", function(){
				this.parentNode.removeChild(this);
			},false)
		}
		callback();
	}
	imgNode.setAttribute("class", "imageslider-img active");
	imgNode.setAttribute("style","display: block;width: 100%;height: auto;top: 0;bottom: 0;left: 0;right: 0;margin: auto;position: absolute;transition:left .75s ease;" + "left:" + el.offsetWidth + "px;");
	imgNode.setAttribute("src", src);
	el.appendChild(imgNode);
}

ImageSlider.prototype.addImage = function(imgSrc){
	this.opt.src.add(imgSrc);
}

ImageSlider.prototype.getOptions = function(){
	return this.opt;
}

ImageSlider.prototype.setOptions = function(optDict){
	this.opt = optDict;
}

ImageSlider.prototype.start = function(){
	this.interval = setInterval((function(_this){
		return function(){
			_this.loadNext();
		}
	})(this), this.opt.interval);
}

ImageSlider.prototype.stop = function(){
	window.clearInterval(this.interval);
}

ImageSlider.prototype.loadNext = function(fileName){
	/* fileName is optional, in case of supplied fileName the specified image
	   will be displayed next, the internal src queue stays unmodified */
	if (fileName === undefined){
		nextElement = this.opt.src[this.viewingIndex];
		ImageSlider.rebuild(this.el, nextElement, (function(_el){
			return function(){
				// Fade Image in
				document.querySelectorAll(".active")[0].style.left = "0px";
			}
		})(this.el));
		this.viewingIndex++;
		if (this.viewingIndex > this.opt.src.length - 1){
			this.viewingIndex = 0;
		}
	} else {
	}
}
