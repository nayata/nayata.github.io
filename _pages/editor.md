---
layout: post
title: "Heaps Editor"
author: "Chester"
description: "Minimal 2D editor written in Haxe Heaps"
permalink: /editor/
---

<center><video width="100%" autoplay muted loop><source src="/assets/video/hl_Wka8AoPWqC.mp4" type="video/mp4"></video></center>
<p></p>

_Tale is a minimal [Jekyll](https://jekyllrb.com/) theme curated for storytellers. It is designed and developed by [myself](https://github.com/chesterhow/) for a friend who writes short stories._

# Tale features
- Compatible with GitHub Pages
- Responsive design (looks just as good on mobile)
- Syntax highlighting, with the help of Pygments
- Markdown and HTML text formatting
- Pagination of posts
- Sticky posts
- Tags
- Excerpt management
- Disqus comments

While doing some research up on GitHub Pages, I accidentally chanced upon this _simple, blog-aware, static site generator_ called [Jekyll](https://jekyllrb.com/) which works really well with GitHub Pages. I figured it would do just fine for my friend and I set about searching for a pretty theme. I wanted a theme with a _book-ish_ vibe. Unfortunately, most of the themes were too modern. Eventually, I caved and begun working on my own theme. With the help of [Poole](https://github.com/poole/poole), the Jekyll Butler, I was able to build **Tale**.


In one scene can be various layers: collision, entitys, images vor visual representationn.

## JSON structure
### Scene
- name : scene name
- width : scene width
- height : scene height
- gridSize : scene grid size
- layers : layers array

### Layer
- **name:** layer name
- **type:** layer type - Collision/Grid/Image/Atlas
- **atlas:** texture atlas name for Atlas-type layer
- **tiles:** tiles array
- **grid:** grid array for Grid-type layer

### Tile
- name : tile name;
- type : tile type - STATIC/DYNAMIC/KINEMATIC/SENSOR
- originX : left position of the tile
- originY : top position of the tile
- x : x position of the tile center
- y : y position of the tile center
- width : tile width
- height : tile height
- source : path to the image or name of the texture atlas part
- data : additional information for tile
- tag : additional information for tile
- path : point's array

### Grid
- cellX : x index of the grid cell
- cellY : y index of the grid cell

## Limitations
- There is no Undo/Redo functions.
- Scene json file should be in the root of your resources folder if you use images or texture atlases.

## Examples
In **examples** folder you can find varios examples of how to parse and use the scenes maded with editor.

## Download
You can download Heaps Editor on the project page in releases section.

Thanks for reading!
