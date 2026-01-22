---
layout: post
title: "Echo Physics"
author: "Nayata"
description: "Using HEXE Collider Prefabs for Echo Physics"
permalink: /hexe-echo/
---

![HEXE](/media/collider.png "HEXE")

<br>

# Using HEXE Collider Prefabs for Echo Physics

**HEXE** can be used to visually construct collision geometry and load it at runtime into an `Echo Physics` world. This example demonstrates loading collider prefabs and converting them into static `Echo` bodies.

### Before start

The following libraries must be included in `compile.hxml`:
```
-lib prefab
-lib echo
```

The example uses **Heaps**, **Echo Physics**, and **Hexe** runtime prefab data.


## Creating Colliders in Hexe

In the Hexe editor:
- Create a prefab file (e.g. level.prefab)
- Add Collider entries
- Set Collider properties

Colliders with `Polygon` shape store their vertices as a packed string in the `path` field.


## Loading the Prefab
In Hexe, prefabs are authored and used as **visual objects**. Because of this, prefabs with the type `collider` cannot be instantiated directly as runtime objects.

Instead, collider prefabs are treated as **data containers**. The required collision information is read from the prefab and then used to manually construct Echo Physics bodies.

Prefab data is loaded using `hxe.Lib.read`:

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


Each collider entry provides positional data, dimensions, rotation, shape type, and additional custom fields. This data is then converted into static Echo bodies.

**Static box colliders**:

```haxe
if (entry.body == STATIC && entry.shape == BOX) {
	world.add(new Body({
		mass: STATIC,
		x: entry.x,
		y: entry.y,
		material: {elasticity: 0.3},
		rotation: entry.rotation != null ? hxd.Math.radToDeg(entry.rotation) : 0, 
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
	var vertices = parsePolygon(entry.path, entry.width, entry.height);

	world.add(new Body({
		mass: STATIC,
		x: entry.x,
		y: entry.y,
		material: {elasticity: 0.3},
		rotation: entry.rotation != null ? hxd.Math.radToDeg(entry.rotation) : 0, 
		shape: {
			type: POLYGON,
			vertices: vertices
		}
	}));
}
```

### Parsing Polygon Vertices

Polygon vertices are stored as a comma-separated string and converted into Echo `Vector2` values:

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

Echo physics bodies can be visualized using the Echo Heaps debug renderer:
```haxe
debug.draw(world);
```

### Full Example

[hexe-echo](https://github.com/nayata/hexe-echo)

<br>

## [Introduction](https://nayata.github.io/hexe)  
## [Quick Start](https://nayata.github.io/hexe/#quick-start)  
## [Working with editor](https://nayata.github.io/hexe/#working-with-editor)  
## [In-game implementation](https://nayata.github.io/hexe-lib)  
## [API](https://nayata.github.io/hexe-api)