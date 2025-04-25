window.storyFormat({
	name: 'My Story Format',
	version: '1.2.0',
	source: '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>{{STORY_NAME}}</title>\n\t</head>\n\t<body>\n\t\t{{STORY_DATA}}\n\t\t<page>\n\t\t</page>\n\t</body>\n</html>',
 	editorExtensions: {
		twine: {
			'^2.4.0-alpha1': {
				codeMirror: {
					commands: {
						upperCase(editor) {
							const doc = editor.getDoc();

							doc.replaceSelection(doc.getSelection().toUpperCase());
						}
					},
					mode() {
						return {
							startState() {
								return {};
							},
							token(stream, state) {
								stream.skipToEnd();
								return 'keyword';
							}
						};
					},
					toolbar(editor, environment) {
						return [
							{
								type: 'button',
								command: 'upperCase',
								icon: 'data:image/svg+xml,...',
								label: 'Uppercase Text'
							}
						];
					}
				},
				references: {
					parsePassageText(text) {
						const match = text.match(/\[move\s*(.+?)\s*]/);
						if (match) {
							return match[1];
						}
						return text;
					}
				}
			}
		}
	}
});