---
layout: post
title: "Heaps Editor"
author: "Nayata"
description: "Minimal 2D editor written in Haxe Heaps"
permalink: /editor/
---

<center><video width="100%" autoplay muted loop><source src="/media/preview.mp4" type="video/mp4"></video></center>
<p></p>

[Heaps Editor](https://github.com/nayata/editor) is an open-source 2D editor designed for quick and easy level creation, especially suited for non-grid-based physics. The editor also supports images, texture atlases, grid layers for pathfinding or grid-based collisions and the creation of pathways for objects.

## Layers
Each scene supports multiple layers with different types.

1. **Collision Layer**
* Create precise collision boundaries with dedicated collision layers, essential for implementing accurate physics interactions in your game.

2. **Image Layer**
* Easily manage and manipulate images with dedicated image layers, allowing for seamless placement and adjustment of visual elements in your levels.

3. **Atlas Layer**
* Optimize rendering performance by organizing images into texture atlases on specialized layers, ensuring efficient use of resources and a polished visual presentation.

4. **Grid Layer**
* Utilize grid layers for pathfinding or grid-based collisions, streamlining the integration of navigation and obstacle detection within your game world.


## Tools
![Editor Tools](/media/tools.png "Editor Tools")

## Mouse control
![Editor Tools](/media/mouse.png "Editor Tools")

## Object editing
![Editor Tools](/media/editing.png "Editor Tools")

## Example
<center><video width="100%" autoplay muted loop controls><source src="/media/editing.mp4" type="video/mp4"></video></center>
<p></p>

## JSON structure
Below is a simplified example of a typical editor scene file:

{% highlight json %}
{
	"name": "New Scene",
	"width": 960,
	"height": 600,
	"gridSize": 60,
	"layers": [
	  {
		"name": "Collision Layer",
		"type": 0,
		"atlas": "",
		"grid": [],
		"tiles": [
		  {
			"name": "empty",
			"type": 0,
			"originX": 0,
			"originY": 0,
			"x": 30,
			"y": 30,
			"width": 60,
			"height": 60,
			"source": "",
			"color": -1,
			"data": "",
			"tag": -1,
			"path": null
		  }
		]
	  }
	]
  }
{% endhighlight %}

### Scene
- **name** - scene name
- **width** - scene width
- **height** - scene height
- **gridSize** - scene grid size
- **layers** - **Layer** array

### Layer
- **name** - layer name
- **type** - layer type - Collision/Grid/Image/Atlas
- **atlas** - texture atlas name for Atlas-type layer
- **tiles** - **Tile** array
- **grid** - **Grid** array for Grid-type layer

### Tile
- **name** - tile name;
- **type** - tile type - STATIC/DYNAMIC/KINEMATIC/SENSOR
- **originX** - left position of the tile
- **originY** - top position of the tile
- **x** - x position of the tile center
- **y** - y position of the tile center
- **width** - tile width
- **height** - tile height
- **source** - path to the image or name of the texture atlas part
- **data** - additional information for the tile
- **tag** - additional information for the tile
- **path** - point's array

### Grid
- **cellX** - x index of the grid cell
- **cellY** - y index of the grid cell

The **typedef** for the all types you can find in [Project parser file](https://github.com/nayata/editor/blob/main/examples/Project.hx).

## Limitations
- No undo/redo functions.
- The JSON scene file should be in the root of the assets folder if you are using images or texture atlases.

## Examples
In the **examples** folder you can find various examples of how to parse and use scenes created with the editor.

## Download
You can download Heaps Editor on the [project page](https://github.com/nayata/editor/releases).