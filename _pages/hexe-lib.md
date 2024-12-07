---
layout: post
title: "In-game implementation"
author: "Nayata"
description: "2D Editor for the Heaps game engine"
permalink: /hexe-lib/
---


### [Load prefab](#load-prefab)  
### [Modify Prefab](#modify-prefab)  
### [Working with editor](https://nayata.github.io/hexe/#working-with-editor)  
### [In-game implementation](https://nayata.github.io/hexe-lib)  
### [API](https://nayata.github.io/hexe-api)


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

# Modify Prefab

Get and modify objects from prefab hierarchy.


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
<br>


## [Introduction](https://nayata.github.io/hexe)  
## [Quick Start](https://nayata.github.io/hexe/#quick-start)  
## [Working with editor](https://nayata.github.io/hexe/#working-with-editor)  
## [In-game implementation](https://nayata.github.io/hexe-lib)  
## [API](https://nayata.github.io/hexe-api)