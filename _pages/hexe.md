---
layout: post
title: "HEXE"
author: "Nayata"
description: "2D Editor for the Heaps game engine"
permalink: /hexe/
---

<center>![HEXE](/media/hexe.png "HEXE")</center>
<p></p>

## Introduction

**HEXE** (Witch) is a prefab editor and runtime library for the [Heaps](https://heaps.io/) game engine.

HEXE is focused on 2D content and serves as a more user-friendly alternative to **Hide** (Heaps IDE).


## How It Works

Use the editor to create a prefab from your project assets and save it as a file in the `res` directory. Then, you can use the `hxe.Lib` library to load the prefab file into the game as an `hxe.Prefab` display object.


## About the Prefab

All prefab files have a *".prefab"* extension to differentiate them from other data files.

**A prefab file** is simply a JSON text file, formatted with newlines, that contains data about the objects to be created (such as bitmaps, interactive elements, etc.), their placement in the scene, and the properties to be applied to these objects.

The library loads and parses the file to retrieve the saved data. It then creates the main prefab object, generates all its child objects, positions them correctly, and sets the required properties.

**A prefab object** is essentially a container for other objects: bitmaps, text elements, interactive components, and others. A prefab could represent an entire game screen, containing other prefabs, a simple UI element, or a game character.

Prefabs can be nested within other prefabs to create complex object hierarchies. In the editor, you can override settings for individual prefabs, allowing certain prefab instances to differ from others.

Once a prefab is placed in the scene, it becomes an instance of the prefab. You can create as many instances as needed.


## Prefab Features

`hxe.Prefab` inherits from `h2d.Object`, so properties such as position, rotation, scale, and opacity can be set for a prefab instance in the same way as for any other object.

The prefab includes a method for quick access to objects within its hierarchy. You can learn more about this in the `In-game Implementation` and `API` sections.