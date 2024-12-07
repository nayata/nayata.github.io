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
### [5. Prefab Bind](#prefab-bind)  
### [6. Override](#override)  


<br>


# Geting Started

In the example `res` folder you can find **card**, **button** and **board** prefabs used in the code examples.

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

Prefab loading and adding to scene.

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


<br>


# Modify Prefab

Get and modify objects from prefab hierarchy. 

In this example added **card.prefab** and **button.prefab**. After this text for "title" textfield from **card.prefab** was changed to "Deem".

From **button.prefab** we get `h2d.Interactive` with name "input" and assigned mouse events to this interactive.

**Note:** for methods which belongs to top `h2d.Object` we dont need to cast type and can just use Prefab `get` method: `button.get("over").visible = true;`


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
		card = hxe.Lib.load("card", s2d);
		card.x = s2d.width * 0.5;
		card.y = s2d.height * 0.5 - 64;

		// Set card prefab title text
		var title:h2d.Text = card.get("title");
		title.text = "Deem";

		// Get type of the `title` object:
		var type = card.typeof("title");
		trace(type);

		// Add `button.prefab`
		button = hxe.Lib.load("button", s2d);
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


<br>


# Prefab Hierarchy

Prefab hierarchy and children

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
		board = hxe.Lib.load("board", s2d);
		board.x = s2d.width * 0.5;
		board.y = s2d.height * 0.5 - 64;

		// Add `button.prefab`
		button = hxe.Lib.load("button", s2d);
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
		// that matched with `Prefab` class
		var cards:Array<Prefab> = board.getAll(Prefab);

		for (card in cards) {
			if (card.has("image")) trace(card.get("image").name);

			// Get all `h2d.Text` objects from this prefab hierarchy
			// Set all text to "text"

			// Note - central card not changed text, because 
			// hierarchy accept only unice names, and this card 
			// was overwrited with another.
			var texfields = card.getAll(h2d.Text);
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


<br>


# Prefab Make

We can create class that will be keep all needed fields and `hxe.Lib` trough method `make` will assign created objects to corresponding fields.

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
		board = hxe.Lib.load("board", s2d);
		board.x = s2d.width * 0.5;
		board.y = s2d.height * 0.5 - 64;

		// Make `Button` class instance from `button.prefab`
		button = hxe.Lib.make("button", Button, s2d);
		button.x = s2d.width * 0.5;
		button.y = s2d.height - 128;

		// Label and interactive alredy exist
		button.label.text = "Select";

		button.input.onClick = onClick;
		button.input.onOver = onOver;
		button.input.onOut = onOut;
	}


	function onClick(e:hxd.Event) {
		var grimCard = board.get("grimCard");

		var title:h2d.Text = grimCard.get("title");
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

Button.hx

```haxe
class Button extends hxe.Prefab {
	public var over:h2d.Bitmap;
	public var input:h2d.Interactive;
	public var label:h2d.Text;
}
```


<br>


# Prefab Bind

Prefab using `Bind`

```haxe
class App extends hxd.App {
	var board:hxe.Prefab;
	var button:Button;

	
	static function main() {
		new App();
	}


	override function init() {
		engine.backgroundColor = 0x222222;
		hxd.Res.initLocal();

		// Add `board.prefab`
		board = hxe.Lib.load("board", s2d);
		board.x = s2d.width * 0.5;
		board.y = s2d.height * 0.5 - 64;

		// new `Button` class instance
		button = new Button(s2d);
		button.x = s2d.width * 0.5;
		button.y = s2d.height - 128;

		// Text and event for button
		button.onClick = onClick;
		button.text = "Select";
	}


	function onClick() {
		var grimCard = board.get("grimCard");

		var title:h2d.Text = grimCard.get("title");
		title.text = title.text == "Grimm" ? "Reaper" : "Grimm";
	}
}
```

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

Prefab loading and adding to scene

```haxe
class App extends hxd.App {
	var card:hxe.Prefab;

	
	static function main() {
		new App();
	}


	override function init() {
		engine.backgroundColor = 0x222222;
		hxd.Res.initLocal();

		// Add `card.prefab` with override fields
		// typedef Field = { name : String, type : String, value : String };
		
		var field = { name : "image", type : "bitmap", value : "sword" };

		var card = hxe.Lib.load("card", s2d, [field]);
		card.x = s2d.width * 0.5;
		card.y = s2d.height * 0.5;
	}
}
```


<br>


## [Introduction](https://nayata.github.io/hexe)  
## [Quick Start](https://nayata.github.io/hexe/#quick-start)  
## [Working with editor](https://nayata.github.io/hexe/#working-with-editor)  
## [In-game implementation](https://nayata.github.io/hexe-lib)  
## [API](https://nayata.github.io/hexe-api)