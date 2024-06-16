---
layout: post
title: "Heleton"
author: "Nayata"
description: "Minimal 2D game skeleton for Haxe Heaps engine"
permalink: /heleton/
---

<center><video width="100%" autoplay muted loop><source src="/media/template.mp4" type="video/mp4"></video></center>
<p></p>

Although [Heaps](https://heaps.io/) is a flexible and performant engine, it can feel a bit **DIY** in certain areas. [Heleton](https://github.com/nayata/heleton) is designed to fill in these gaps for a quicker start: it includes a scene manager with smooth transitions, automatic scene updates, an tween engine, scripts for custom resize handling, and a simple performance display panel.

**Heleton** draws some inspiration from **deepnight**’s [gameBase](https://github.com/deepnight/gameBase), but is designed to be as simple and minimalistic as possible.


# App

The `App` class is the entry point of your game and the engine that handles scene updates, transitions, tween animations, and resizing.

`App` extends `hxd.App` and provides the same capabilities but works with `heaps.Scene` instead of `h2d.Scene`. The main concept is that you add or remove all scenes to/from `App.s2d`.

![Display Hierarchy](/media/hierarchy.png "Display Hierarchy")
_App display hierarchy_

To set your first scene, use the `startingScene` method in `App`, either by overriding it or directly within `App`.

```haxe
function startingScene() {
    scene = new Intro();
}
```

This will create and add your scene to the display list.


# Scene

`heaps.Scene` is the base object for your game screens, such as splash screens, menus, inventories, pause screens, etc.

Within each scene, you have a shortcut for quick access to `App.ME` — `app`, and you can change game scenes with a single line of code:

```haxe
app.scene = new Game();
```

This triggers the following workflow:

* All interactive elements are locked.
* The App begins the transition animation between scenes.
* The App adds the new scene to the display scene.
* The App adds the new scene to the global update/resize list.
* The new scene receives `onAdd` and `onResize` events.
* The old scene receives a `dispose` event, is removed from the update/resize list, and is removed from the display scene.
* All interactive elements are unlocked.

Each scene added to the display has automatic `update` and `onResize` events. The `onResize` event is called once when the scene is added and any time the window is resized.

The main idea is that each scene has its own events. For example, you can add an inventory or pause screen to an existing game scene, and this screen will have automatic update/resize events that can be overridden for your specific purposes.

Example of the empty `Scene`:

```haxe
class Game extends heaps.Scene {

	public function new(?parent:h2d.Object) {
		super(parent);
	}

	override function update(dt:Float) {
	}

	override function onResize() {
	}
}
```

`dt:Float` from `update` can be used to adjust values that are FPS dependent, such as velocities or accelerations. See how the `dt` is used in a mobile example.

`heaps.Scene` inherits from `h2d.Layers`. The application handles all scene transitions using `Transition`.


# Transition

`heaps.Transition` are where things can get wild if you modify them without understanding the underlying mechanics.

The purpose of a `Transition` is to gradually fade in/out a black bitmap image, lock/unlock interaction events, and add/remove scenes. If you read and understand the code, you can add your own custom transition types — custom transition example.

You can specify the `Transition` fade time/interval:

- `transition.duration`: Transition fade time.
- `transition.interval`: interval between transitions.

`Transition` uses its own simple animation mechanics. For more complex animations, Heleton includes the `Animate` engine.


# Animate

<center><video width="100%" autoplay muted loop><source src="/media/tween.mp4" type="video/mp4"></video></center>
<p></p>

`heaps.Animate` is a minimal and frame independent tween engine with a convenient syntax for adding animations.

For example, if you want to animate an image’s alpha channel to 0 over 5 ms, instead of the classic:

```haxe
tween.add(image, { alpha: 0 }, 5);
```

You can write it shorter and simpler:

```haxe
tween.add(image.alpha, 0, 5);
```

### Tween Parameters

- `target.property`: The target and property to animate.
- `to`: The value to animate to.
- `time`: The duration of the tween.
- `ease`: The easing function for the tween — `heaps.Easing`.
- `delay`: Optional delay before the tween starts.

Tween using the easing function `heaps.Easing`.
```haxe
tween.add(image.alpha, 1, 5, "easeIn"); // or:
tween.add(image.alpha, 1, 5, heaps.Easing.EASE_IN);
```

Optionally, you can add a callback function that will be invoked at the end of the tween duration.

```haxe
tween.add(image.alpha, 1, 60).end(mainMenu);

function mainMenu() {
	app.scene = new Menu();
}
```

You can also use the auto-cleanup parameter, which will remove the target from the scene at the end of the tween.

```haxe
tween.add(image.alpha, 0, 60).remove();
```

For safe usage, all tweens have an overwrite mechanism — older tweens with the same property will be removed. The exception is tweens with a delay.

```haxe
tween.add(image.alpha, 0, 5); // This will be overrited by next tween.
tween.add(image.alpha, 1, 5); // This will be tweened successfully.
tween.add(image.alpha, 0, 5, 10); // This will be tweened successfully due delay.
tween.add(image.x, 0, 5); // This will be tweened successfully due another setter.
```

Within your scene, you have a reference to the tween instance from `App` for easier use, but you can create other instances as needed.


# Screen

<center><video width="100%" autoplay muted loop><source src="/media/screen.mp4" type="video/mp4"></video></center>
<p></p>

`heaps.Screen` is a set of functions for creating responsive UI and screen design. It's minimal and not a "full-fledged layout framework", but it can make things look a lot prettier across different screen sizes.

Minimal tutorial
Responsive Demo

Main idea is to use separate resize for the background and game screen or for the game screen and the game UI. 

After window resize `App` updates `heaps.Screen` to recalculate all important information and you can use this information for custom resize logic.


# Stats

`heaps.Stats` can add a simple panel to display the game's FPS, draw calls, and memory usage. The stats panel is added on top of the hierarchy above the `Transition` screen.

To show the stats panel, use:

```haxe
heaps.Stats.show();
```

You can also add custom lines to the panel to display information during the update loop:

```haxe
heaps.Stats.add("Level", level.id);
heaps.Stats.add("On ground", player.ground);
heaps.Stats.add("");
heaps.Stats.add("Enemies", totalEnemies);
heaps.Stats.add("Coins", level.coins);
```

![Stats](/media/stats.jpg "Stats")
_heaps.Stats custom lines_

To hide the stats panel when it's not needed, use:

```haxe
heaps.Stats.hide();
```



# Device

`heaps.Device` is a simple way to check where your game is running.

- **mobile:** returns `true` if the game is running in a mobile browser.
- **desktop:** returns `true` if the game is running as a standalone application.
- **web:** returns `true` if the game is running in a desktop browser.


# Configuring Heleton

**Heleton** requires minimal configuration. All you need to specify is the game's initial scene, the target resolution for your game if you plan to use custom resizing, and if necessary, the `Transition` fade time/interval.


# Demo

[Example with touch support](https://nayata.itch.io/mobile)  
[Responsive game example](https://nayata.itch.io/responsive)


# Examples
scenes — basic scene switching.  
mobile — web example with touch support.  
responsive — responsive game example.  
pausable — pausable tweens.  
transition — custom transition.  
device — device test.

