# HDR Web Design Guide

Let's make the web more vibrant!

https://quinton-ashley.github.io/hdr-web-design-guide/

## What is HDR?

HDR (High Dynamic Range) colors aren't just for movies and games, you can use them to make better looking websites too!

Nearly every smartphone, laptop, television, and tablet made after 2016 is capable of displaying vibrant HDR colors. The difference between SDR (Standard Dynamic Range) and HDR is especially noticeable in vivid reds and greens, which look dull on SDR displays.

Yet by default, SDR colors are mapped to a limited range (gamut) of your device's HDR color space. The intention behind this is to approximate what the colors would look like on an SDR display, to maintain color consistency across devices. As a result though, SDR content still looks pretty dull!

What good are all these HDR displays if we're not going to use them to their full potential? People are spending 7 hours a day looking at these things. They deserve better! Us web designers need to do our part to add vibrant colors to the web and I've compiled this guide to help you do it.

## HDR Color Conversion

This [HDR Color Converter](https://quinton-ashley.github.io/hdr-web-design-guide/converter.html) converts SDR colors directly to HDR, without mapping to the smaller SDR gamut, essentially giving you more vibrant colors to use on HDR devices.

"srgb" is a [color space](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color) that became the standard for the web in 1996. You've probably been using it in the iconic HEX format. It's a bit sad, but to use HDR colors you'll need to use a different format. All HDR devices support the "display-p3" color space and newer devices support the "rec2020" color space.

To use the converter, simply plug in your HEX color and it'll pop out an HDR color in the `color(display-p3, ...)` and `oklch(lightness, chroma, hue)` formats.

I recommend using [oklch](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch), which is supported by all modern browsers.

If you want to do a legit gamut conversion, use the [oklch color converter](https://oklch.com/).

## How do I use HDR colors in CSS?

You can use the CSS [@media (color-gamut)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut) media query to apply these colors only to HDR devices and fallback to sRGB for non-HDR devices.

```css
body {
	background-color: #ff0a52;
}

@media (color-gamut: p3) {
	body {
		background-color: oklch(0.657 0.294 16.668);
	}
}
```

My HDR converter tool rounds oklch values to 3 decimal places, since more precision isn't really necessary and long numbers would just make your CSS file bigger.

## How do I get images to display in HDR?

To directly map sRGB colors in an image to an HDR color space, you'll need to use a photo editor that supports HDR color spaces. Here's how to do it in Photoshop:

In Photoshop's menu go to Edit > Color Settings...

Set "Working Space" RGB to "Display P3" (or whatever HDR color space you want to use).

Then set "Color Management Policies" RGB to "Convert to Working RGB".

When you export an image make sure that "Convert to sRGB" is unchecked and "Embed Color Profile" is checked.

After exporting an image it should have your specified HDR color space embedded in it.

## How do I get SVGs to display in HDR?

There are probably color settings you can adjust in Illustrator but my SVGs were pretty simple so I just changed the colors directly in the SVG code.

I added a CSS `<style>` tag to the SVG and gave all the paths a class name. Note that media queries don't work in SVGs, so you should just use oklch colors.

Check out the article ["How to use P3 colors with SVGs"](https://evilmartians.com/chronicles/how-to-use-p3-colors-in-svg) for more info.

## How do I use HDR colors in JavaScript?

First check if the device is HDR capable:

```js
window.matchMedia('(dynamic-range: high) and (color-gamut: p3)').matches;
```

You can use the [culori](https://culorijs.org/) library to parse colors and convert between color spaces.

Take a look at the article ["HDR Displays and CSS: Enhancing Color and Brightness on the Web"](https://habr.com/en/articles/715084/) for more info.

## How'd you figure all this out?

I realized that a long time ago I'd set my MacBook's Color Display Profile to "sRGB IEC61966-2.1", which can be done in System Preferences. It makes sRGB colors look great by just mapping them directly to the full P3 color space of the display.

But I noticed that when viewing my website on my iPhone, the colors looked dull. I needed to find a way to make the website look good using the default color profiles that come with the devices.

I changed my Color Display Profile on my MacBook back to the default "Color LCD", which is very similar to P3 and it caused the colors on my website looked dull on my MacBook just like they did on my iPhone.

If I opened up my website assets in InkScape and Photoshop, they'd look great in the editor, but after exporting they'd look dull. I tried to mess around with the export settings but nothing worked. I was so confused.

After lots of searching, I finally found this video [Get Started with Display P3](https://developer.apple.com/videos/play/wwdc2017/821). It kind of sucks because it's not in HDR and the projector they used didn't support HDR either, so all the examples they're showing are fake. At least the video provides some good information.

## License

CC0 - Public Domain
