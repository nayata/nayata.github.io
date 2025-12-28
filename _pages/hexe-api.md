---
layout: doc
title: "API"
author: "Nayata"
description: "2D Editor for the Heaps game engine"
permalink: /hexe-api/
---

<div class="container main-content">
				<div class="page-header"><span class="viewsource"><a
							href="https://github.com/nayata/prefab/blob/main/src/hxe/Lib.hx" class="btn btn-medium"><i
								class="fa fa-eye"></i> View source</a></span>
					<h1><small>class</small> Lib</h1>
					<h4><small>package <a href="https://github.com/nayata/prefab/tree/main/src/hxe">hxe</a></small></h4>
				</div>
				<div class="body">
					<div class="doc doc-main">
						<p></p>
					</div>
					<h3 class="section">Static methods</h3>
					<div class="fields">
						<div class="field "><a name="bind"></a>
							<h3 class="anchor">
								<code><span class="label label-static">static</span><a href="#bind"><span class="identifier">bind</span></a>(<span style="white-space:nowrap">path:<a class="type" title="String - The basic String class." href="../String.html">String</a>,</span> <span style="white-space:nowrap">object:<a class="type" title="Dynamic - Dynamic is a special type which is compatible with all other types." href="../Dynamic.html">Dynamic</a></span>):<a class="type" title="Void - The standard Void type." href="../Void.html">Void</a></code>
							</h3>
							<div class="doc">
								<p>Load the Prefab from <code>path</code> and assign all created hierarchy objects to
									fields of the <code>object</code> instance.</p>
								<p class="javadoc">Parameters:</p>
								<table class="table table-bordered params">
									<tr>
										<th style="width:25%;"><code>path</code></th>
										<td>
											<p>Prefab name. Can point to a subfolder and must be without an extension.
											</p>
										</td>
									</tr>
									<tr>
										<th style="width:25%;"><code>object</code></th>
										<td>
											<p>An instance to which the prefab adds itself and assigns fields from the
												loaded <code>path</code> hierarchy.</p>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="field "><a name="load"></a>
							<h3 class="anchor">
								<code><span class="label label-static">static</span><a href="#load"><span class="identifier">load</span></a>(<span style="white-space:nowrap">path:<a class="type" title="String - The basic String class." href="../String.html">String</a>,</span> <span style="white-space:nowrap">?parent:<a class="type" title="h2d.Object - A base 2D class that all scene tree elements inherit from." href="../h2d/Object.html">Object</a>,</span> <span style="white-space:nowrap">?field:<a class="type" title="Array - An Array is a storage for values." href="../Array.html">Array</a>&lt;<a class="type" title="hxe.Field" href="../hxe/Field.html">Field</a>&gt;</span>):<a class="type" title="hxe.Prefab" href="../hxe/Prefab.html">Prefab</a></code>
							</h3>
							<div class="doc">
								<p>Load the Prefab with the given name <code>path</code> from the <code>res</code>
									folder.
									<code>path</code> can point to a subfolder (eg: "ui/button") and must be without an
									extension.
								</p>
								<p class="javadoc">Parameters:</p>
								<table class="table table-bordered params">
									<tr>
										<th style="width:25%;"><code>path</code></th>
										<td>
											<p>Prefab name.</p>
										</td>
									</tr>
									<tr>
										<th style="width:25%;"><code>parent</code></th>
										<td>
											<p>An optional parent
												<code><a href="../h2d/Object.html#Object">h2d.Object</a></code> instance
												to which prefab adds itself if set.</p>
										</td>
									</tr>
									<tr>
										<th style="width:25%;"><code>field</code></th>
										<td>
											<p>An optional <code><a href="../hxe/Field.html#Field">Field</a></code>
												structure to override default values ​​for an object in the prefab
												hierarchy(text, texture atlas tile. eg: "[{ name : "label", type :
												"text", value : "new label" }]").</p>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="field "><a name="make"></a>
							<h3 class="anchor">
								<code><span class="label label-static">static</span><a href="#make"><span class="identifier">make</span></a>(<span style="white-space:nowrap">path:<a class="type" title="String - The basic String class." href="../String.html">String</a>,</span> <span style="white-space:nowrap">type:<a class="type" title="Class - An abstract type that represents a Class." href="../Class.html">Class</a>&lt;<a class="type" title="Dynamic - Dynamic is a special type which is compatible with all other types." href="../Dynamic.html">Dynamic</a>&gt;,</span> <span style="white-space:nowrap">?parent:<a class="type" title="h2d.Object - A base 2D class that all scene tree elements inherit from." href="../h2d/Object.html">Object</a></span>):<a class="type" title="Dynamic - Dynamic is a special type which is compatible with all other types." href="../Dynamic.html">Dynamic</a></code>
							</h3>
							<div class="doc">
								<p>Create a Prefab with a given class <code>type</code>, load data from
									<code>path</code> and assign all created hierarchy objects to fields of this
									instance.</p>
								<p class="javadoc">Parameters:</p>
								<table class="table table-bordered params">
									<tr>
										<th style="width:25%;"><code>path</code></th>
										<td>
											<p>Prefab name. Can point to a subfolder and must be without an extension.
											</p>
										</td>
									</tr>
									<tr>
										<th style="width:25%;"><code>type</code></th>
										<td>
											<p>Prefab class. All objects from the loaded hierarchy will be assigned to
												the fields of this instance.</p>
										</td>
									</tr>
									<tr>
										<th style="width:25%;"><code>parent</code></th>
										<td>
											<p>An optional parent
												<code><a href="../h2d/Object.html#Object">h2d.Object</a></code> instance
												to which prefab adds itself if set.</p>
										</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="field "><a name="setCache"></a>
							<h3 class="anchor">
								<code><span class="label label-static">static</span><a href="#setCache"><span class="identifier">setCache</span></a>(<span style="white-space:nowrap">atlas:<a class="type" title="hxd.res.Atlas" href="../hxd/res/Atlas.html">Atlas</a></span>):<a class="type" title="Void - The standard Void type." href="../Void.html">Void</a></code>
							</h3>
							<div class="doc">
								<p></p>
							</div>
						</div>
					</div>
				</div>


<br>

<div class="page-header"><span class="viewsource"><a
				href="https://github.com/nayata/prefab/blob/main/src/hxe/Prefab.hx" class="btn btn-medium"><i
					class="fa fa-eye"></i> View source</a></span>
		<h1><small>class</small> Prefab</h1>
		<h4><small>package <a href="https://github.com/nayata/prefab/tree/main/src/hxe">hxe</a></small></h4>
		<h4><small>extends <a class="type"
					title="h2d.Object - A base 2D class that all scene tree elements inherit from."
					href="https://heaps.io/api/h2d/Object.html">Object</a></small></h4> <span
			class="label label-meta label-meta-directlyUsed"
			title="Marks types that are directly referenced by non-extern code.">@:directlyUsed</span>
	
<div class="body">
		<div class="doc doc-main">
			<p></p>
		</div>
		<h3 class="section">Constructor</h3>
		<div class="fields">
			<div class="field "><a name="new"></a>
				<h3 class="anchor">
					<code><a href="#new"><span class="identifier">new</span></a>(<span style="white-space:nowrap">?parent:<a class="type" title="h2d.Object - A base 2D class that all scene tree elements inherit from." href="https://heaps.io/api/h2d/Object.html">Object</a></span>)</code>
				</h3>
				<div class="doc">
					<p></p>
				</div>
			</div>
		</div>
		<h3 class="section">Methods</h3>
		<div class="fields">
			<div class="field "><a name="as"></a>
				<h3 class="anchor">
					<code><a href="#as"><span class="identifier">as</span></a>&lt;<span class="type">T</span>&gt;(<span style="white-space:nowrap">c:<a class="type" title="Class - An abstract type that represents a Class." href="../Class.html">Class</a>&lt;<span class="type">T</span>&gt;</span>):<span class="type">T</span></code>
				</h3>
				<div class="doc">
					<p>Converts the prefab to another <code>c</code> prefab class.
					</p>
				</div>
			</div>
			<div class="field "><a name="get"></a>
				<h3 class="anchor">
					<code><a href="#get"><span class="identifier">get</span></a>&lt;<span class="type">T</span>&gt;(<span style="white-space:nowrap">n:<a class="type" title="String - The basic String class." href="../String.html">String</a></span>):<a class="type" title="Null - Null&amp;lt;T&amp;gt; is a wrapper that can be used to make the basic types Int, Float and Bool nullable on static targets." href="../Null.html">Null</a>&lt;<span class="type">T</span>&gt;</code>
				</h3>
				<div class="doc">
					<p>Get an object from the prefab hierarchy with the given name <code>n</code>.</p>
				</div>
			</div>
			<div class="field "><a name="all"></a>
				<h3 class="anchor">
					<code><a href="#all"><span class="identifier">all</span></a>&lt;<span class="type">T</span>&gt;(<span style="white-space:nowrap">c:<a class="type" title="Class - An abstract type that represents a Class." href="../Class.html">Class</a>&lt;<span class="type">T</span>&gt;,</span> <span style="white-space:nowrap">?all:<a class="type" title="Array - An Array is a storage for values." href="../Array.html">Array</a>&lt;<span class="type">T</span>&gt;</span>):<a class="type" title="Array - An Array is a storage for values." href="../Array.html">Array</a>&lt;<span class="type">T</span>&gt;</code>
				</h3>
				<div class="doc">
					<p>Find all objects of the given class <code>c</code> in the prefab hierarchy.</p>
					<p class="javadoc">Parameters:</p>
					<table class="table table-bordered params">
						<tr>
							<th style="width:25%;"><code>all</code></th>
							<td>
								<p>An optional array instance to fill results with. Allocates a new array if
									not set.</p>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="field "><a name="has"></a>
				<h3 class="anchor">
					<code><a href="#has"><span class="identifier">has</span></a>(<span style="white-space:nowrap">n:<a class="type" title="String - The basic String class." href="../String.html">String</a></span>):<a class="type" title="Bool - The standard Boolean type, which can either be true or false." href="../Bool.html">Bool</a></code>
				</h3>
				<div class="doc">
					<p>Check if the prefab has a object in the hierarchy with the given <code>n</code> name.
					</p>
				</div>
			</div>
			<div class="field "><a name="is"></a>
				<h3 class="anchor">
					<code><a href="#is"><span class="identifier">is</span></a>&lt;<span class="type">T</span>&gt;(<span style="white-space:nowrap">c:<a class="type" title="Class - An abstract type that represents a Class." href="../Class.html">Class</a>&lt;<span class="type">T</span>&gt;</span>):<a class="type" title="Bool - The standard Boolean type, which can either be true or false." href="../Bool.html">Bool</a></code>
				</h3>
				<div class="doc">
					<p>Check if the prefab matches the given class <code>c</code>.
					</p>
				</div>
			</div>
			<div class="field "><a name="typeof"></a>
				<h3 class="anchor">
					<code><a href="#typeof"><span class="identifier">typeof</span></a>(<span style="white-space:nowrap">n:<a class="type" title="String - The basic String class." href="../String.html">String</a></span>):<a class="type" title="String - The basic String class." href="../String.html">String</a></code>
				</h3>
				<div class="doc">
					<p>Get the class name of the object from the prefab hierarchy with the given name
						<code>n</code>.</p>
				</div>
			</div>
		</div>
			</div>


</div>

<br>


<h2 id="introduction-1"><a href="https://nayata.github.io/hexe">Introduction</a></h2>
<h2 id="quick-start-1"><a href="https://nayata.github.io/hexe/#quick-start">Quick Start</a></h2>
<h2 id="working-with-editor-1"><a href="https://nayata.github.io/hexe/#working-with-editor">Working with editor</a></h2>
<h2 id="in-game-implementation"><a href="https://nayata.github.io/hexe-lib">In-game implementation</a></h2>
<h2 id="api"><a href="https://nayata.github.io/hexe-api">API</a></h2>