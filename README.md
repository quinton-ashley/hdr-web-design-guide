# HDR Color Converter

Web design tool to convert colors to HDR.

Let's make the web more vibrant!

## Why do colors look different on my HDR device?

HDR devices, including any Apple device made after 2016, can display more vibrant reds and greens than the sRGB color space. However, by default, these devices convert sRGB colors to a limited range of the P3 color space. The intention behind this is to approximate what the colors would look like on an sRGB display. But in my opinion, this is really confusing for artists and designers who just want to take advantage of the wider color gamut.

## What does this tool do?

This tool converts sRGB colors directly to the P3 color space, without mapping them to the smaller sRGB gamut. This effectively makes the colors more vibrant on HDR devices.

Using HDR colors is the only way to access the full range of colors on HDR devices.

## How do I use the HDR colors on my website?

You can use the [@media (color-gamut)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut) media query to apply these colors only to HDR devices.

Fallback to sRGB for non-HDR devices:

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

oklch is [supported by all modern browsers](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch#browser_compatibility).

## How do I get images to display in HDR?

Want to directly map sRGB colors in an image to an HDR color space?

In Photoshop's menu go to Edit > Color Settings...

Set "Working Space" RGB to "Display P3" (or whatever HDR color space you want to use).

Then set "Color Management Policies" RGB to "Convert to Working RGB".

When you export an image make sure that "Convert to sRGB" is unchecked and "Embed Color Profile" is checked.

## How do I get SVGs to display in HDR?

There are probably color settings you can adjust in Illustrator but my SVGs were pretty simple so I just changed the colors directly in the SVG code.

I added a CSS `<style>` tag to the SVG and gave all the paths a class name. Note that media queries don't work in SVGs, so you should just use oklch colors.

## How'd you figure all this out?

I realized that a long time ago I'd set my MacBook's Color Display Profile to "sRGB IEC61966-2.1", which can be done in System Preferences. It makes sRGB colors look great by just mapping them directly to the full P3 color space of the display.

But I noticed that when viewing my website on my iPhone, the colors looked dull. There's no way to change the Color Display Profile on iOS. I also think most people would never think to change their Color Display Profile, even if the option was available. So if I wanted my website to look vibrant on iOS, I needed to find a solution.

I changed my Color Display Profile on my MacBook to the default "Color LCD", which is very similar to P3 and it caused the colors on my website looked dull on my MacBook just like they did on my iPhone.

So then if I opened up my website assets in InkScape and Photoshop, they'd look great in the editor, but after exporting they'd look dull. I tried to mess around with the export settings but nothing worked.

After lots of searching, I finally found this video [Get Started with Display P3](https://developer.apple.com/videos/play/wwdc2017/821). It kind of sucks because it's not in HDR and the projector they used didn't support HDR either. So all the examples they're showing are totally faked, which is ridiculous. It's like TV marketing material levels of exaggeration. At least the video provides some good information about how to use HDR colors.

## License

CC0 - Public Domain
