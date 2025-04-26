window.storyFormat({
	name: 'My Story Format',
	version: '1.7.8',
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
						const iconColor = environment.appTheme === 'dark' ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 30%)';

						return [
							{
								type: 'menu',
								icon: `data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="${iconColor}" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" > <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" /> <path d="M19 16h-12a2 2 0 0 0 -2 2" /> <path d="M9 8h6" /></svg>`,
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
								icon: 'data:image/svg+xml,%3Csvg%20%20xmlns=%22http://www.w3.org/2000/svg%22%20%20width=%2224%22%20%20height=%2224%22%20%20viewBox=%220%200%2024%2024%22%20%20fill=%22none%22%20%20stroke=%22currentColor%22%20%20stroke-width=%222%22%20%20stroke-linecap=%22round%22%20%20stroke-linejoin=%22round%22%20%20class=%22icon%20icon-tabler%20icons-tabler-outline%20icon-tabler-book-2%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M19%204v16h-12a2%202%200%200%201%20-2%20-2v-12a2%202%200%200%201%202%20-2h12z%22%20/%3E%3Cpath%20d=%22M19%2016h-12a2%202%200%200%200%20-2%202%22%20/%3E%3Cpath%20d=%22M9%208h6%22%20/%3E%3C/svg%3E',
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
								icon: 'data:image/svg+xml,%3Csvg%20%20xmlns=%22http://www.w3.org/2000/svg%22%20%20width=%2224%22%20%20height=%2224%22%20%20viewBox=%220%200%2024%2024%22%20%20fill=%22none%22%20%20stroke=%22currentColor%22%20%20stroke-width=%222%22%20%20stroke-linecap=%22round%22%20%20stroke-linejoin=%22round%22%20%20class=%22icon%20icon-tabler%20icons-tabler-outline%20icon-tabler-brackets-contain%22%3E%3Cpath%20stroke=%22none%22%20d=%22M0%200h24v24H0z%22%20fill=%22none%22/%3E%3Cpath%20d=%22M7%204h-4v16h4%22%20/%3E%3Cpath%20d=%22M17%204h4v16h-4%22%20/%3E%3Cpath%20d=%22M8%2016h.01%22%20/%3E%3Cpath%20d=%22M12%2016h.01%22%20/%3E%3Cpath%20d=%22M16%2016h.01%22%20/%3E%3C/svg%3E',
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