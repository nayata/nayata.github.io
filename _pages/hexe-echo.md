---
layout: post
title: "HEXE - Echo Physics"
author: "Nayata"
description: "Using Collider Prefabs for Echo Physics"
permalink: /hexe-echo/
---

![HEXE](/media/collider.png "HEXE")

<br>

# Using HEXE Collider Prefabs for Echo Physics

**HEXE** can be used to visually construct collision geometry and load it at runtime into an `Echo Physics` world. This example demonstrates loading collider prefabs and converting them into static `Echo` bodies.

<br>

### Before start

The following libraries must be included in `compile.hxml`:
```
-lib prefab
-lib echo
```

The example uses **Heaps**, **Echo Physics**, and **Hexe** runtime prefab data.

<br>

## Creating Colliders in Hexe

In the Hexe editor:

- Create a prefab file (e.g. level.prefab)
- Add Collider entries
- Set Collider properties

Colliders with `Polygon` shape store their vertices as a packed string in the `path` field.



## Prefab Object

`hxe.Prefab` inherits from `h2d.Object`, so properties such as position, rotation, scale, and opacity can be set for a prefab instance in the same way as for any other object.

The prefab includes a method for quick access to objects within its hierarchy. You can learn more about this in the `In-game Implementation` and `API` sections.


<br>

## [Introduction](https://nayata.github.io/hexe)  
## [Quick Start](https://nayata.github.io/hexe/#quick-start)  
## [Working with editor](https://nayata.github.io/hexe/#working-with-editor)  
## [In-game implementation](https://nayata.github.io/hexe-lib)  
## [API](https://nayata.github.io/hexe-api)