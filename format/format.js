window.storyFormat({
	name: 'My Story Format',
	version: '1.9.2',
	source: '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>{{STORY_NAME}}</title>\n\t</head>\n\t<body>\n\t\t{{STORY_DATA}}\n\t\t<page>\n\t\t</page>\n\t</body>\n</html>',
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
								return {};
							},
							token(stream, state) {
								if (stream.sol() && stream.next() == "-") {
									stream.skipTo(':');
									return 'keyword';
								}

								// Are we at an insert?
								if (stream.match(/^\[.+?\]/)) {
									return 'keyword';
								}
					
								// Try scanning forward to an insert or link.
								if (stream.eatWhile(/[^[{]/)) {
									return 'text';
								}

								stream.skipToEnd();
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