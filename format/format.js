window.storyFormat({
	name: 'My Story Format',
	version: '1.6.4',
	source: '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>{{STORY_NAME}}</title>\n\t</head>\n\t<body>\n\t\t{{STORY_DATA}}\n\t\t<page>\n\t\t</page>\n\t</body>\n</html>',
 	editorExtensions: {
		twine: {
			'^2.4.0-alpha1': {
				references: {
					parsePassageText(text) {
						const matchers = [/\[move\s*(.+?)\s*]/g, /^-.*?:\s*([^\n:]*?)(?=\s*:|$)/g];
						const results = [];

						for (const matcher of matchers) {
							let match;

							while ((match = matcher.exec(text))) {
								results.push(match[1]);
							}
						}

						return results;
					}
				}
			}
		}
	}
});