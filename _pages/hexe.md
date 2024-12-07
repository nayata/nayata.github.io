---
layout: post
title: "HEXE"
author: "Nayata"
description: "2D Editor for the Heaps game engine"
permalink: /hexe/
---

![HEXE](/media/hexe.png "HEXE")

<br>

# Introduction

**HEXE** (Witch) is a prefab editor and runtime library for the [Heaps](https://heaps.io/) game engine.

HEXE is focused on 2D content and serves as a more user-friendly alternative to **Hide** (Heaps IDE).

<br>

# How It Works

Use the editor to create a prefab from your project assets and save it as a file in the `res` directory. Then, you can use the `hxe.Lib` library to load the prefab file into the game as an `hxe.Prefab` display object.

<br>

# About the Prefab

All prefab files have a *".prefab"* extension to differentiate them from other data files.

**A prefab file** is simply a JSON text file, formatted with newlines, that contains data about the objects to be created (such as bitmaps, interactive elements, etc.), their placement in the prefab, and the properties to be applied to these objects.

The library loads and parses the file to retrieve the saved data. It then creates the main prefab object, generates all its child objects, positions them correctly, and sets the required properties.

**A prefab object** is essentially a container for other objects: bitmaps, text elements, interactive components, and others. A prefab could represent an entire game screen, containing other prefabs, a simple UI element, or a game character.

![Prefab](/media/prefab.png "Prefab file & object")

Prefabs can be nested within other prefabs to create complex object hierarchies. In the editor, you can override settings for individual prefabs, allowing certain prefab instances to differ from others.

Once a prefab is placed in the scene, it becomes an instance of the prefab. You can create as many instances as needed.



## Prefab Object

`hxe.Prefab` inherits from `h2d.Object`, so properties such as position, rotation, scale, and opacity can be set for a prefab instance in the same way as for any other object.

The prefab includes a method for quick access to objects within its hierarchy. You can learn more about this in the `In-game Implementation` and `API` sections.



## Supported Objects

List of Heaps h2d objects that can be added to a prefab:

- [x] **Object**
- [x] **Bitmap from image file**
- [x] **Bitmap from loaded Texture Atlas**
- [x] **Text with default or loaded Font**
- [x] **Interactive**
- [x] **Graphics**
- [x] **Linked Prefab**
- [ ] Anim
- [ ] ScaleGrid 
- [ ] Mask

<br>

# Quick Start

Download the editor and create your prefab. 

Install the library from haxelib:

```
haxelib install prefab
```

Alternatively the dev version of the library can be installed from github:

```
haxelib git prefab https://github.com/nayata/prefab.git
```

Include the library in your project's `.hxml`:

```
-lib prefab
```

Use `hxe.Lib` to load and add a prefab instance to the scene. Note: the prefab name must be without extension.

```haxe
var object:hxe.Prefab = hxe.Lib.load("myPrefab", s2d);
```

<br>

# Working with editor

Editor interface.

![Editor](/media/editor.png "Working with editor")

#### Menu
- **File** - open and save files.
- **Edit** - Undo / Redo. Copy and paste objects.
- **Assets** - Add objects. Load fonts and texture atlases.

#### Tools
- **Translate** - Move object.
- **Rotation** - Rotate object.
- **Scale** - Scale object.
- **Lock** - Objects auto-select locking.

#### Outliner
- **Prefab objects hierarchy.**

#### Properties
- **Object properties** - Name, transformation, display, and specific properties based on the object type.


### Creating prefab:

<center><video width="100%" controls muted loop><source src="/media/prefab.mp4" type="video/mp4"></video></center>
<p></p>


### Assets Path

For each asset used in a prefab, a relative path will be generated. If you plan to use assets from the `res` subfolder, it is recommended to save the prefab file first, before adding any assets.


### Naming

Each object added to a prefab is given a default name based on its type *(e.g., "object", "bitmap", "text")*. You can change this name to something unique if you need to access the object in the prefab hierarchy through code.


### Order and Parenting

You can adjust the display order of prefab objects or change their parent objects. Simply drag the object item in the `Outliner` to a new position or drop it onto another item.

Note that some objects cannot have children, such as `Text`, `Interactive`, and `Linked Prefab`.


### Overriding prefab fields:

<center><video width="100%" controls muted loop><source src="/media/nested.mp4" type="video/mp4"></video></center>
<p></p>

<br>

## [Introduction](https://nayata.github.io/hexe)  
## [Quick Start](https://nayata.github.io/hexe/#quick-start)  
## [Working with editor](https://nayata.github.io/hexe/#working-with-editor)  
## [In-game implementation](https://nayata.github.io/hexe-lib)  
## [API](https://nayata.github.io/hexe-api)