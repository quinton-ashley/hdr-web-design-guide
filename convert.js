document.addEventListener('DOMContentLoaded', function () {
	function updateColors() {
		var hex = document.getElementById('hexColor').value;

		if (/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
			// Convert HEX to RGB
			let c = culori.parse(hex);
			document.getElementById('rgbColor').value = culori.formatRgb(c);

			// Convert HEX to Display-P3, effectively adding vibrancy
			let r = Math.round(c.r * 1000) / 1000;
			let g = Math.round(c.g * 1000) / 1000;
			let b = Math.round(c.b * 1000) / 1000;
			let p3 = `color(display-p3 ${r} ${g} ${b})`;
			document.getElementById('displayP3Color').value = p3;

			p3 = `color(display-p3 ${c.r} ${c.g} ${c.b})`;

			// Convert P3 to OKLCH
			let o = culori.converter('oklch')(culori.parse(p3));
			let lightness = Math.round(o.l * 1000) / 1000;
			let chroma = Math.round(o.c * 1000) / 1000;
			let hue = Math.round((o.h || 0) * 1000) / 1000;
			let oklch = `oklch(${lightness} ${chroma} ${hue})`;
			document.getElementById('oklchColor').value = oklch;

			// Update color swatches
			document.getElementById('sdr-swatch').style.backgroundColor = hex;
			document.getElementById('hdr-swatch').style.backgroundColor = oklch;
		} else {
			document.getElementById('rgbColor').value = 'Invalid HEX';
			document.getElementById('displayP3Color').value = 'Invalid HEX';
			document.getElementById('oklchColor').value = 'Invalid HEX';
		}
	}
	updateColors();
	window.updateColors = updateColors;
});
