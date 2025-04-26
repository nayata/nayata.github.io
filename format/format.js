window.storyFormat({
	name: 'My Story Format',
	version: '1.8.3',
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
								icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-align-box-left-middle'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z' /%3E%3Cpath d='M9 15h-2' /%3E%3Cpath d='M13 12h-6' /%3E%3Cpath d='M11 9h-4' /%3E%3C/svg%3E`,
								label: 'Commands',
								items: [
									{
										type: 'button',
										command: 'insertIf',
										label: 'Move to route'
									},
									{
										type: 'button',
										command: 'insertIfElse',
										label: 'Load story'
									},
									{type: 'separator'},
									{
										type: 'button',
										command: 'insertVariable',
										label: 'Transition'
									},
									{
										type: 'button',
										command: 'insertChance',
										label: 'Wait'
									},
									{type: 'separator'},
									{
										type: 'button',
										command: 'insertVariable',
										label: 'Close'
									},
									{
										type: 'button',
										command: 'insertChance',
										label: 'Lock'
									}
								]
							},
							{
								type: 'menu',
								icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-sticker-2'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M6 4h12a2 2 0 0 1 2 2v7h-5a2 2 0 0 0 -2 2v5h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2z' /%3E%3Cpath d='M20 13v.172a2 2 0 0 1 -.586 1.414l-4.828 4.828a2 2 0 0 1 -1.414 .586h-.172' /%3E%3C/svg%3E`,
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
								icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='icon icon-tabler icons-tabler-outline icon-tabler-brackets'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M8 4h-3v16h3' /%3E%3Cpath d='M16 4h3v16h-3' /%3E%3C/svg%3E`,
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