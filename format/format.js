window.storyFormat({
	name: 'My Story Format',
	version: '1.7.4',
	source: '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>{{STORY_NAME}}</title>\n\t</head>\n\t<body>\n\t\t{{STORY_DATA}}\n\t\t<page>\n\t\t</page>\n\t</body>\n</html>',
 	editorExtensions: {
		twine: {
			'^2.4.0-alpha1': {
				codeMirror: {
					commands: {
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
						return [
							{
								type: 'menu',
								icon: 'data:image/svg+xml,...',
								label: 'Modifiers',
								items: [
									{
										type: 'button',
										command: 'insertIf',
										icon: 'data:image/svg+xml,...',
										label: 'If'
									},
									{
										type: 'button',
										command: 'insertIfElse',
										icon: 'data:image/svg+xml,...',
										label: 'If and Else'
									},
									{type: 'separator'},
									{
										type: 'button',
										command: 'insertVariable',
										icon: 'data:image/svg+xml,...',
										label: 'Variable'
									},
									{
										type: 'button',
										command: 'insertChance',
										icon: 'data:image/svg+xml,...',
										label: 'Chance'
									},
									{
										type: 'button',
										command: 'insertDice',
										icon: 'data:image/svg+xml,...',
										label: 'Dice'
									}
								]
							},
							{
								type: 'menu',
								icon: 'data:image/svg+xml,...',
								label: 'Commands',
								items: [
									{
										type: 'button',
										command: 'insertIf',
										icon: 'data:image/svg+xml,...',
										label: 'Move to route'
									},
									{
										type: 'button',
										command: 'insertIfElse',
										icon: 'data:image/svg+xml,...',
										label: 'Load story'
									},
									{type: 'separator'},
									{
										type: 'button',
										command: 'insertVariable',
										icon: 'data:image/svg+xml,...',
										label: 'Transition'
									},
									{
										type: 'button',
										command: 'insertChance',
										icon: 'data:image/svg+xml,...',
										label: 'Wait'
									},
									{type: 'separator'},
									{
										type: 'button',
										command: 'insertVariable',
										icon: 'data:image/svg+xml,...',
										label: 'Close'
									},
									{
										type: 'button',
										command: 'insertChance',
										icon: 'data:image/svg+xml,...',
										label: 'Lock'
									}
								]
							},
							{
								type: 'button',
								icon: 'data:image/svg+xml,...',
								label: 'Brackets',
								command: 'insertBrackets',
								disabled: !editor.getDoc().somethingSelected()
							}
						];
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