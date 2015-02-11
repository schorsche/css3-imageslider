# css3-imageslider
A lightweight CSS3 Imageslider

It takes a list of filenames and a waiting interval. It will then proceed to slide through the images at the specified interval.
This, of course, reinvents the wheel. However, the site where I deploy this thing, http://chorknaben-biberach.de, is not in need for a more complex implementation.

## Requirements

imageslider.js does not have any dependencies.
However, it currently relies on the ```transitionend``` DOM Event, so a modern Browser is required for proper execution. This will be fixed in the future (using dirty ```setTimeout``` hacks).


## Using

Add imageslider.min.js to your project's HTML. Inlining the code is recommended.

### Create the element Imageslider will operate on ###
```html
<div id="imageslider-demo" class="centered size-imageslider"></div>
```

### Start the ImageSlider ###
```js
// Some Element with the size specifications and initial
// background you desire
var imageslider_demo = document.getElementById("imageslider-demo");

// Supply Image locations and interval duration to ImageSlider,
// alternative do this dynamically with .addImage(src)
var options = {
	src: [
		"img/Die erste Busfahrt (Biberach->Valence).jpg",
		"img/Die erste Busfahrt 2.jpg",
		"img/Ankunft in Valence.jpg",
		"img/Rathaus Valence.jpg",
		"img/Spanische Tundra.jpg",
		"img/Barcelona.jpg",
		"img/Barcelona Sagrada 1.jpg",
		"img/Sagrada Familia 1.jpg",
		"img/Architektur in Valencia.jpg",
		"img/Chillen am Strand (Valencia).jpg",
		"img/Servant (Freizeit).jpg"
  ],

	// Argument for internal setInterval(func, duration) call. Note that this
	// is the duration specified + the time it takes for the image to fully load.
	// This will be fixed in the future.
	interval: 3000
};
var slider = new ImageSlider(imageslider_demo, options);

// Change the Image at the duration specified by options.interval
slider.start();

// but slide the first Image in immediately!
slider.loadNext();
```

### API Documentation ###
```js
// Dynamically add a Image, instead of initially supplying it to options.src
ImageSlider.prototype.addImage(src)

// Start cycling through the Images
ImageSlider.prototype.start()

// Stop cycling through the Images
ImageSlider.prototype.stop()

// Load the next image immediately
ImageSlider.prototype.loadNext()

// Getter for options Array
ImageSlider.prototype.getOptions()

// Setter for options Array
ImageSlider.prototype.setOptions(optDict)
```


Check [imageslider.html](https://rawgit.com/schorsche/css3-imageslider/master/imageslider.html) for a demo.
