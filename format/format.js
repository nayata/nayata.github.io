window.storyFormat({
	name: "Harrow",
	version: "1.6.0",
	description: "Harrow narrative format. See its <a href='https://github.com/nayata/harrow' target='_blank'>documentation</a>.",
	author: "Nayata",
	proofing: false,
	source: "<!DOCTYPE html>\r\n<html>\r\n\t<head>\r\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n\t\t<meta charset=\"utf-8\"/>\r\n\t\t<title>{{STORY_NAME}}</title>\r\n\t\t<style>html {\r\n\tdisplay: grid;\r\n\theight: 100%;\r\n\tfont-size: 100%;\r\n\tfont-size: 21px;\r\n}\r\n\r\nbody {\r\n\tfont-family: 'Helvetica', sans-serif;\r\n\tbackground: #222222;\r\n\tbackground-image: none;\r\n\tbackground-position: 50% 50%;\r\n\tbackground-repeat: no-repeat;\r\n\tbackground-size: cover;\r\n\tscroll-behavior: smooth;\r\n\toverflow: auto;\r\n}\r\n\r\n/* Page Layout */\r\npage {\r\n\tmin-width: 0;\r\n\tmin-height: 0;\r\n\twidth: 700px;\r\n\theight: 90%;\r\n\tdisplay: grid;\r\n\tgrid-template-rows: auto 1fr auto;\r\n\tposition: absolute;\r\n\ttop: 0; bottom: 0; left: 0; right: 0;\r\n\tmargin: auto;\r\n\tborder-radius: 16px;\r\n\tfont-size: 1rem;\r\n\tcolor: #333;\r\n\tbackground: #fafafa;\r\n\ttransition: 0.6s background ease;\r\n}\r\n\r\n/* Page Layout with Illustration */\r\npage.novel {\r\n\tgrid-template-rows: auto auto 1fr auto;\r\n}\r\npage.novel textbox {\r\n\tpadding: 1em 3em 0;\r\n}\r\n\r\n/* Page Elements */\r\nheader {\r\n\tpadding: 2em 3em 1em;\r\n\tcolor: #555;\r\n}\r\nchapter {\r\n\tfloat: left;\r\n}\r\n\r\nimagebox {\r\n\tdisplay: none;\r\n\tposition: relative;\r\n\tpadding: 0 3em;\r\n\tmargin: 0 3em;\r\n\twidth: auto;\r\n\theight: 280px;\r\n\tbackground: #fff;\r\n\tbackground-image: none;\r\n\tbackground-position: 50% 50%;\r\n\tbackground-size: cover;\r\n\topacity: 0;\r\n}\r\n\r\ntextbox {\r\n\tpadding: 2em 3em 0;\r\n\tscroll-behavior: smooth;\r\n\toverflow: auto;\r\n\twidth: auto;\r\n}\r\ntextbox p {\r\n\tline-height: 1.5;\r\n\tmargin-top: 1rem;\r\n}\r\ntextbox img {\r\n\twidth: 100%;\r\n\theight: auto;\r\n}\r\n.speaker {\r\n\tdisplay: none;\r\n}\r\n\r\naction {\r\n\tpadding: 0 3em 2em;\r\n}\r\n\r\nchoice, button {\r\n\tpadding: 16px 0;\r\n\tborder-style: none;\r\n\tborder-radius: 10px;\r\n\tfont-family: sans-serif;\r\n\tfont-weight: 500;\r\n\tfont-style: normal;\r\n\tfont-size: .875em;\r\n\tline-height: 1.5;\r\n\tcolor: #ececec;\r\n\tbackground-color: rgb(50, 50, 50);\r\n\tcursor: pointer;\r\n\tdisplay: block;\r\n\tmargin: 4px auto 0;\r\n\ttext-align: center;\r\n\twidth: 70%;\r\n}\r\nbutton:hover {\r\n\tbackground-color: rgb(46, 46, 46);\r\n}\r\n.disabled {\r\n\tpointer-events: none;\r\n\topacity: 0.9;\r\n}\r\n\r\n/* Settings buttons */\r\nopen, close {\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\ttop: 2em; right: 3em;\r\n\tcursor: pointer;\r\n\theight: 20px;\r\n\twidth: 20px;\r\n}\r\nopen {\r\n\tbackground-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' fill='currentColor' width='30px' height='30px' viewBox='0 0 30 30' enable-background='new 0 0 30 30' xml:space='preserve'><rect width='30' height='6'/><rect y='24' width='30' height='6'/><rect y='12' width='30' height='6'/></svg>\");\r\n\tbackground-size: contain;\r\n\topacity: 0.75;\r\n}\r\nclose {\r\n\tbackground-image: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' fill='currentColor' stroke='currentColor' stroke-width='7' width='30px' height='30px' viewBox='0 0 30 30' enable-background='new 0 0 30 30' xml:space='preserve'><line x1='2' y1='2' x2='28' y2='28'/><line x1='28' x2='2' y1='2' y2='28'/></svg>\");\r\n\tbackground-size: contain;\r\n\topacity: 0.75;\r\n\tz-index: -100;\r\n}\r\n\r\n/* Settings screen */\r\nsettings {\r\n\twidth: auto;\r\n\theight: auto;\r\n\tdisplay: none;\r\n\tposition: absolute;\r\n\ttop: 0; bottom: 0; left: 0; right: 0;\r\n\tpadding: 6em 0 2em;\r\n\tmargin: auto;\r\n\tborder-radius: 16px;\r\n\tbackground: #fafafa;\r\n\toverflow: auto;\r\n\tfont-size: 1rem;\r\n\tz-index: -1;\r\n\topacity: 0;\r\n}\r\nsettings content {\r\n\tpadding: 0 3em;\r\n\tscroll-behavior: smooth;\r\n\toverflow: auto;\r\n}\r\nsettings p {\r\n\tline-height: 1.5;\r\n\tmargin-top: 1rem;\r\n}\r\nsettings img {\r\n\twidth: 100%;\r\n\theight: auto;\r\n}\r\n\r\n/* Resize */\r\n@media screen and (max-width: 600px) {\r\n\tpage {\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\tborder-radius: 0;\r\n\t}\r\n\theader {\r\n\t\tpadding: 2em 2em 1em;\r\n\t}\r\n\timagebox {\r\n\t\tmargin: 0 2em;\r\n\t}\r\n\ttextbox {\r\n\t\tpadding: 2em 2em 0;\r\n\t}\r\n\taction {\r\n\t\tpadding: 0 2em 2em;\r\n\t}\r\n\tchoice, button {\r\n\t\twidth: 100%;\r\n\t}\r\n\tpage.novel textbox {\r\n\t\tpadding: 1em 2em 0;\r\n\t}\r\n\topen, close {\r\n\t\tright: 2em;\r\n\t}\r\n\tsettings {\r\n\t\tborder-radius: 0;\r\n\t}\r\n\tsettings content {\r\n\t\tpadding: 0 2em;\r\n\t}\r\n}</style>\r\n\t</head>\r\n\t<body>\r\n\t\t{{STORY_DATA}}\r\n\t\t<transition></transition>\r\n\t\t<page>\r\n\t\t<settings></settings>\r\n\t\t<close></close><open></open>\r\n\t\t<header>\r\n\t\t\t<chapter>Chapter</chapter>\r\n\t\t</header>\r\n\t\t<imagebox></imagebox>\r\n\t\t<textbox></textbox>\r\n\t\t<action>\r\n\t\t\t<dialogue></dialogue>\r\n\t\t\t<button></button>\r\n\t\t</action>\r\n\t\t</page>\r\n\t</body>\r\n\t<script>novel</script>\r\n\t<script src=\"https://code.jquery.com/jquery-3.1.0.min.js\"></script>\r\n</html>",
 	editorExtensions: {
		twine: {
			'^2.4.0-alpha1': {
				codeMirror: {
					commands: {
						insertMove(editor) {
							editor.replaceSelection('[move route]');
							editor.focus();
						},
						insertLoad(editor) {
							editor.replaceSelection('[story name]');
							editor.focus();
						},
						insertTransition(editor) {
							editor.replaceSelection('[transition name]');
							editor.focus();
						},
						insertWait(editor) {
							editor.replaceSelection('[wait time]');
							editor.focus();
						},
						insertClose(editor) {
							editor.replaceSelection('[close]');
							editor.focus();
						},
						insertLock(editor) {
							editor.replaceSelection('[lock]');
							editor.focus();
						},
						insertIf(editor) {
							editor.replaceSelection('[if condition]\n\n[end]');
							editor.focus();
						},
						insertIfElse(editor) {
							editor.replaceSelection('[if condition]\n\n[else]\n\n[end]');
							editor.focus();
						},
						insertVariable(editor) {
							editor.replaceSelection('[name = value]');
							editor.focus();
						},
						insertChance(editor) {
							editor.replaceSelection('[name chance value]');
							editor.focus();
						},
						insertDice(editor) {
							editor.replaceSelection('[name roll value]');
							editor.focus();
						},
						insertBrackets(editor) {
							editor.replaceSelection('[' + editor.getSelections() + ']');
							editor.focus();
						}
					},
					toolbar(editor, environment) {
						const iconColor = environment.appTheme === 'dark' ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 30%)';
						return [
							{
								type: 'menu',
								icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${iconColor}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-sticker-2'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M6 4h12a2 2 0 0 1 2 2v7h-5a2 2 0 0 0 -2 2v5h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2z' /%3E%3Cpath d='M20 13v.172a2 2 0 0 1 -.586 1.414l-4.828 4.828a2 2 0 0 1 -1.414 .586h-.172' /%3E%3C/svg%3E`,
								label: 'Story',
								items: [
									{
										type: 'button',
										command: 'insertMove',
										label: 'Move to route'
									},
									{
										type: 'button',
										command: 'insertLoad',
										label: 'Load story'
									},
									{type: 'separator'},
									{
										type: 'button',
										command: 'insertTransition',
										label: 'Transition'
									},
									{
										type: 'button',
										command: 'insertWait',
										label: 'Wait'
									},
									{type: 'separator'},
									{
										type: 'button',
										command: 'insertClose',
										label: 'Close'
									},
									{
										type: 'button',
										command: 'insertLock',
										label: 'Lock'
									}
								]
							},
							{
								type: 'menu',
								icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${iconColor}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-edit'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' /%3E%3Cpath d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' /%3E%3Cpath d='M16 5l3 3' /%3E%3C/svg%3E`,
								label: 'Modifiers',
								items: [
									{
										type: 'button',
										command: 'insertIf',
										label: 'If'
									},
									{
										type: 'button',
										command: 'insertIfElse',
										label: 'If and Else'
									},
									{type: 'separator'},
									{
										type: 'button',
										command: 'insertVariable',
										label: 'Variable'
									},
									{
										type: 'button',
										command: 'insertChance',
										label: 'Chance'
									},
									{
										type: 'button',
										command: 'insertDice',
										label: 'Dice'
									}
								]
							},
							{
								type: 'button',
								icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${iconColor}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-brackets'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M8 4h-3v16h3' /%3E%3Cpath d='M16 4h3v16h-3' /%3E%3C/svg%3E`,
								label: 'Brackets',
								command: 'insertBrackets',
								disabled: !editor.getDoc().somethingSelected()
							}
						];
					},
					mode() {
						return {
							startState() {
								return {choice: false};
							},
							token(stream, state) {
								if (stream.eatSpace()) return null;

								if (stream.match('//')) {
								  stream.skipToEnd();
								  return 'meta';
								}

								if (stream.match('-')) {
									if (stream.skipTo(':')) {
										choice = true;
									}
									else {
										choice = false;
										stream.skipToEnd();
									}
									return 'text';
								}
								if (stream.match(':')) {
									if (choice) {
										stream.skipToEnd();
										choice = false;
										return 'keyword';
									}
									else {
										stream.skipToEnd();
									}
									return 'text';
								}
							
								if (stream.match(/^\[.+?\]/)) {
									return 'keyword';
								}
							
								stream.next();
								return 'text';
							}
						};
					}
				},
				references: {
					parsePassageText(text) {
						const matchers = [/\[move\s*(.+?)\s*]/g, /^-[^:\n]*:\s*([^\n:]*)(?=\s*:|\n|$)/gm];
						const results = [];

						for (const matcher of matchers) {
							let match;
							while ((match = matcher.exec(text))) {
								const action = match[1].match(/(=|\+|-|\*|\/| is | roll | chance )/);
								if (!action) {
									results.push(match[1].trim());
								}
							}
						}
						return results;
					}
				}
			}
		}
	}
});