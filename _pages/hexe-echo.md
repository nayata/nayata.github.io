---
layout: post
title: "Echo Physics"
author: "Nayata"
description: "Using HEXE Collider Prefabs with Echo Physics"
permalink: /hexe-echo/
---

![HEXE](/media/collider.png "HEXE")

<br>

# Using HEXE Collider Prefabs with Echo Physics

**HEXE** allows you to visually construct collision geometry and convert it into `Echo` Physics bodies at runtime.

### Before start

This example uses **Heaps**, **Echo** Physics, and **HEXE** runtime prefab data. 
Add the required libraries to your `compile.hxml`:
```
-lib prefab
-lib echo
```


## Creating Colliders in Hexe

In the Hexe editor:
- Create a prefab file (e.g. level.prefab)
- Add Collider entries
- Set Collider properties



## Loading the Prefab
In Hexe, prefabs are created and used as **visual objects**. Because of this, prefabs with the type `collider` cannot be instantiated directly as runtime objects.

Instead, collider prefabs are treated as **data containers**. The required collision information is read from the prefab and then used to manually construct `Echo` bodies.

Prefab data can be loaded using `hxe.Lib.read`:

```haxe
var prefab = hxe.Lib.read("level");
```

The prefab may contain multiple child entries of different types. Only entries with the type `collider` are relevant for physics and should be filtered explicitly:

```haxe
for (entry in prefab.children) {
	// Skip non-Collider entries
	if (entry.type != "collider") continue;

	// Collider data is used here to create Echo bodies
}
```


Each collider entry provides position, dimensions, rotation, shape type, and additional fields required to build an `Echo` body.

**Static box colliders**:

```haxe
if (entry.body == STATIC && entry.shape == BOX) {
	var rotation = entry.rotation != null ? hxd.Math.radToDeg(entry.rotation) : 0;

	world.add(new Body({
		mass: STATIC,
		x: entry.x,
		y: entry.y,
		material: {elasticity: 0.3},
		rotation: rotation, 
		shape: {
			type: RECT,
			width: entry.width,
			 height: entry.height
		}
	}));
}
```


**Static polygon colliders**:
```haxe
if (entry.body == STATIC && entry.shape == POLYGON) {
	var rotation = entry.rotation != null ? hxd.Math.radToDeg(entry.rotation) : 0;
	var vertices = parsePolygon(entry.path, entry.width, entry.height);

	world.add(new Body({
		mass: STATIC,
		x: entry.x,
		y: entry.y,
		material: {elasticity: 0.3},
		rotation: rotation, 
		shape: {
			type: POLYGON,
			vertices: vertices
		}
	}));
}
```

### Parsing Polygon Vertices

Polygon colliders store their vertices in the `path` field as a comma-separated string of coordinates. This data must be parsed and converted into Echo `Vector2` values:

```haxe
function parsePolygon(str:String, width:Float, height:Float):Array<Vector2> {
	var parts = str.split(",");
	var verts:Array<Vector2> = [];

	for (i in 0...Std.int(parts.length / 2)) {
		var x = Std.parseFloat(parts[i * 2]);
		var y = Std.parseFloat(parts[i * 2 + 1]);
		verts.push(new Vector2(x, y));
	}

	return verts;
}
```


## Debug Rendering

`Echo` physics bodies can be visualized using the Echo 'HeapsDebug' renderer:
```haxe
debug.draw(world);
```

### Complete Example

A working example project is available here: [hexe-echo](https://github.com/nayata/hexe-echo)

<br>

## [Introduction](https://nayata.github.io/hexe)  
## [Quick Start](https://nayata.github.io/hexe/#quick-start)  
## [Working with editor](https://nayata.github.io/hexe/#working-with-editor)  
## [Using Collider Prefabs with Echo Physics](https://nayata.github.io/hexe-echo)  
## [In-game implementation](https://nayata.github.io/hexe-lib)  
## [API](https://nayata.github.io/hexe-api)