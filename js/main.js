; (function () {
	var use2x = (window.devicePixelRatio || 1) > 1.5;

	function throttle (fn, delay) {
		var timer = null;
		return function () {
			var self = this, args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn.apply(self, args);
			}, delay || 200)
		};
	}

	function resolveImg () {
		var windowWidth = window.innerWidth;
		$('img.responsive').each(function (index, image) {
			image = $(image);
			var base = image.attr('data-base') || '';
			var src = ((use2x && image.attr('data-src2x')) || image.attr('data-src')).split(/\s*,\s*/g);
			for (var j = 1, jj = src.length; j < jj && windowWidth > parseInt(src[j]); j += 2);
			image.attr('src', base + src[j - 1]);
		});
	}

	$(window).on('resize', throttle(resolveImg));
	resolveImg();
})();
