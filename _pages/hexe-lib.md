---
layout: post
title: "In-game implementation"
author: "Nayata"
description: "2D Editor for the Heaps game engine"
permalink: /hexe-lib/
---


### [1. Load prefab](#load-prefab)  
### [2. Modify Prefab](#modify-prefab)  
### [3. Prefab Hierarchy](#prefab-hierarchy)  
### [4. Prefab Make](#prefab-make)  
### [5. Custom Prefab Class](#custom-prefab-class)  
### [6. Prefab Bind](#prefab-bind)  
### [7. Override](#override)  


<br>


# Geting Started

In the example `res` folder you will find the **card**, **button** and **board** prefabs used in the code examples.

**Before start:** install the library from haxelib:

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


<br>


# Load Prefab

Loading a **card.prefab** and adding it to the scene.

```haxe
class App extends hxd.App {
	
	static function main() {
		new App();
	}

	override function init() {
		engine.backgroundColor = 0x222222;
		hxd.Res.initLocal();

		// Add `card.prefab`
		var card = hxe.Lib.load("card", s2d);
		card.x = s2d.width * 0.5;
		card.y = s2d.height * 0.5;
	}
}
```

At this point, the prefab is successfully created and added to the scene. However, loading a prefab is usually only the first step.

In a real game, a prefab is rarely static — you typically want to:

- change text labels (for example, scores, names, or descriptions),
- access and modify visual elements,
- enable or disable parts of the prefab,
- or react to game logic and user input.

To do this, you need a way to **access the objects inside the prefab**.


<br>


# Modify Prefab

Once a prefab is created and placed in the scene, the next step is to **access and modify its internal objects**.

Each `hxe.Prefab` provides the `get` method, which allows you to retrieve an object
from the prefab hierarchy by its name and then work with it in code.

In this example, **card.prefab** and **button.prefab** are added to the scene.
After that, the text of the *"title"* text field inside *card* prefab is changed to "Deem".

From **button.prefab**, an `h2d.Interactive` named "input" is retrieved, and mouse
events are assigned to it.

**Note:** In this example, prefabs are created directly and added to the scene using the `Prefab` constructor.


```haxe
import hxe.Prefab;

class App extends hxd.App {
	var card:Prefab;
	var button:Prefab;

	
	static function main() {
		new App();
	}


	override function init() {
		engine.backgroundColor = 0x222222;
		hxd.Res.initLocal();

		// Add `card.prefab`
		card = new Prefab("card", s2d);
		card.x = s2d.width * 0.5;
		card.y = s2d.height * 0.5 - 64;

		// Set card prefab title text
		var title:h2d.Text = card.get("title");
		title.text = "Deem";

		// Get type of the `title` object:
		var type = card.typeof("title");
		trace(type);

		// Add `button.prefab`
		button = new Prefab("button", s2d);
		button.x = s2d.width * 0.5;
		button.y = s2d.height - 128;

		// Set button prefab label text
		var label:h2d.Text = button.get("label");
		label.text = "Select";

		// Get interactive from button prefab
		var input:h2d.Interactive = button.get("input");
		input.onClick = onClick;
		input.onOver = onOver;
		input.onOut = onOut;
	}


	function onClick(e:hxd.Event) {
		var title:h2d.Text = card.get("title");
		title.text = title.text == "Grimm" ? "Reaper" : "Grimm";
	}


	function onOver(e:hxd.Event) {
		button.get("over").visible = true;
	}


	function onOut(e:hxd.Event) {
		button.get("over").visible = false;
	}
}
```

<center><video width="100%" autoplay muted loop><source src="/media/card.mp4" type="video/mp4"></video></center>
<p></p>

### Type safety and the get method

For methods and properties that belong to the base `h2d.Object`, **you do not need to
explicitly specify a class** - you can directly use the result of `get`:

```haxe
button.get("over").visible = true;
```

However, the `get` method also supports **explicit type checking**.

It accepts an optional class parameter, which ensures that the retrieved object
matches the expected type. If the object exists but does not match the specified
class, `null` is returned.

```haxe
var input = button.get("input", h2d.Interactive);
```

If no class is provided, the object is returned directly using an unsafe cast.

```haxe
var input:h2d.Interactive = button.get("input");
```

This makes `get` flexible: you can rely on quick access when you are confident about
the prefab structure, or enforce strict type safety when needed.

### Getting object types

In addition to `get`, `hxe.Prefab` also provides the `typeof` method, which allows you
to retrieve the actual class type of an object from the prefab hierarchy.


<br>


# Prefab Hierarchy

Prefab hierarchy and childrens.

The `get` method of a `hxe.Prefab` is used to get a specific object by the specified name.

The `hxe.Prefab` also has a `all` method with which you can get an array of objects of the specified type. For example, we can get all objects with the `h2d.Bitmap` or `h2d.Text` type.

The prefab hierarchy is a *key->value* `Map` so objects in it are not equal to objects in the prefab `children` array. This is because objects with non-unique names overwrite each other.


```haxe
import hxe.Prefab;

class App extends hxd.App {
	var board:Prefab;
	var button:Prefab;

	
	static function main() {
		new App();
	}


	override function init() {
		engine.backgroundColor = 0x222222;
		hxd.Res.initLocal();

		// Add `board.prefab`
		board = new Prefab("board", s2d);
		board.x = s2d.width * 0.5;
		board.y = s2d.height * 0.5 - 64;

		// Add `button.prefab`
		button = new Prefab("button", s2d);
		button.x = s2d.width * 0.5;
		button.y = s2d.height - 128;

		// Set button prefab label text
		var label:h2d.Text = button.get("label");
		label.text = "Select";

		// Get interactive from button prefab
		var input:h2d.Interactive = button.get("input");
		input.onClick = onClick;
		input.onOver = onOver;
		input.onOut = onOut;
	}


	function onClick(e:hxd.Event) {
		// Get all objects from `board` prefab hierarchy, 
		// that matched with `Prefab` class (2 cards)
		var cards:Array<Prefab> = board.all(Prefab);

		for (card in cards) {
			if (card.has("image")) trace(card.get("image").name);

			// Get all `h2d.Text` objects from this prefab hierarchy
			// Set all text to "text"

			// Note: the last card did not change its text because the prefab hierarchy
			// allows only unique object names. As a result, the `cards` array contains
			// only two prefabs — one prefab was overwritten by another prefab
			// with the same name.
			var texfields = card.all(h2d.Text);
			for (texfield in texfields) {
				texfield.text = "text";
			}
		}

		// Get all `h2d.Object` from `board` prefab children
		for (child in @:privateAccess board.children) {
			trace(child.name, child.x);
		}
	}


	function onOver(e:hxd.Event) {
		button.get("over").visible = true;
	}


	function onOut(e:hxd.Event) {
		button.get("over").visible = false;
	}
}
```

**Note**: the last card did not change its text because the prefab `hierarchy` allows only unique object names. As a result, the `cards` array contains only two prefabs - one prefab was overwritten by another prefab with the same name.


<br>


# Prefab Make

We can create a custom class **extending** `hxe.Prefab` that declares and stores all required fields of the prefab.

When such a prefab is instantiated, its visual content is created automatically using `hxe.Lib.make`, and the corresponding objects from the prefab hierarchy are assigned to the fields of this class.

After the prefab has been fully created and all objects are instantiated, the `init` method is called.
This method can be used to define the prefab’s behavior - for example, to set up interactions, connect it to game logic, or configure runtime state.

```haxe
import hxe.Prefab;

class App extends hxd.App {
	var board:Prefab;
	var button:Button; // Now this is the `Button`


	static function main() {
		new App();
	}


	override function init() {
		engine.backgroundColor = 0x222222;
		hxd.Res.initLocal();

		// Add `board.prefab`
		board = new Prefab("board", s2d);
		board.x = s2d.width * 0.5;
		board.y = s2d.height * 0.5 - 64;

		// Make `Button` class instance from `button.prefab`
		button = new Button("button", s2d);
		button.x = s2d.width * 0.5;
		button.y = s2d.height - 128;

		// Label and interactive alredy exist
		button.onClick = onClick;
		button.text = "Select";
	}


	function onClick() {
		var card:Prefab = board.get("grimCard");

		var title:h2d.Text = card.get("title");
		title.text = title.text == "Grimm" ? "Reaper" : "Grimm";
	}
}
```

`Button.hx`

```haxe
class Button extends hxe.Prefab {
	var over:h2d.Object;
	var input:h2d.Interactive;
	var label:h2d.Text;

	public var text(default, set):String = "text"; 
	

	override function init() {
		input.onClick = function(e:hxd.Event) { onClick(); };
		input.onOver = onOver;
		input.onOut = onOut;
	}

	public dynamic function onClick() {}

	function set_text(v) {
		return text = label.text = v;
	}

	function onOver(e:hxd.Event) {
		over.visible = true;
	}

	function onOut(e:hxd.Event) {
		over.visible = false;
	}
}
```


<br>


# Custom Prefab Class

Prefabs can contain **other prefabs** inside their hierarchy. Such linked prefabs are loaded by the library as regular `hxe.Prefab` instances by default.

However, a linked prefab can also be assigned a **custom class**.

In the previous section, a `Button` class extending `hxe.Prefab` was created. This class can now be reused as part of a more complex UI structure, such as a menu screen.

- Create a new prefab and add **card.prefab** and **button.prefab** to it.
- Assign the `Button` class to **button.prefab**.
- Save the new prefab as **ui.prefab**.

![Custom Prefab Class](/media/linked.png "Custom Prefab Class")

When this prefab is loaded, the linked **button.prefab** will be instantiated as a `Button` object instead of a `hxe.Prefab`. This allows the composed prefab to expose
fully functional, behavior-aware elements while keeping the structure modular and reusable.

```haxe
import hxe.Prefab;

class App extends hxd.App {
	var screen:Prefab;
	var button:Button;

	
	static function main() {
		new App();
	}


	override function init() {
		engine.backgroundColor = 0x222222;
		hxd.Res.initLocal();

		// Add `ui.prefab`
		screen = new Prefab("ui", s2d);

		// Get `button.prefab` from `ui`
		button = screen.get("button");
		button.onClick = onClick;
	}


	function onClick() {
		button.text = button.text == "Select" ? "Selected" : "Select";
	}
}
```


<br>


# Prefab Bind

If you want to use a prefab and at the same time don't want to change your class - you can use the `bind` method of the `hxe.Lib` library to "inject" the required prefab.

`Button.hx` extending `h2d.Object`

```haxe
class Button extends h2d.Object {
	var over:h2d.Bitmap;
	var input:h2d.Interactive;
	var label:h2d.Text;

	public var text(default, set):String = "text"; 
	

	public function new(?parent:h2d.Object) {
		super(parent);

		// Bind `button.prefab`
		hxe.Lib.bind("button", this);
		
		input.onClick = function(e:hxd.Event) { onClick(); };
		input.onOver = onOver;
		input.onOut = onOut;
	}

	public dynamic function onClick() {}

	function set_text(v) {
		return text = label.text = v;
	}

	function onOver(e:hxd.Event) {
		over.visible = true;
		label.textColor = 0x333333;
	}

	function onOut(e:hxd.Event) {
		over.visible = false;
		label.textColor = 0xffffff;
	}
}
```

<br>


# Override

Using the editor you can override some values ​​of objects in the prefab. You can also do this dynamically by specifying the required parameters.


```haxe
import hxe.Prefab;

class App extends hxd.App {
	var card:Prefab;

	
	static function main() {
		new App();
	}


	override function init() {
		engine.backgroundColor = 0x222222;
		hxd.Res.initLocal();

		// Add `card.prefab` with override fields
		// typedef Field = { name : String, type : String, value : String };
		
		var field = { name : "image", type : "bitmap", value : "sword" };

		var card = new Prefab("card", s2d, [field]);
		card.x = s2d.width * 0.5;
		card.y = s2d.height * 0.5;
	}
}
```

![Override fields](/media/override.png "Override fields")

<br>


## [Introduction](https://nayata.github.io/hexe)  
## [Quick Start](https://nayata.github.io/hexe/#quick-start)  
## [Working with editor](https://nayata.github.io/hexe/#working-with-editor)  
## [In-game implementation](https://nayata.github.io/hexe-lib)  
## [API](https://nayata.github.io/hexe-api)