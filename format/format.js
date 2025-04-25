window.storyFormat({
	name: 'My Story Format',
	version: '1.5.2',
	source: '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>{{STORY_NAME}}</title>\n\t</head>\n\t<body>\n\t\t{{STORY_DATA}}\n\t\t<page>\n\t\t</page>\n\t</body>\n</html>',
 	editorExtensions: {
		twine: {
			'^2.4.0-alpha1': {
				references: {
					parsePassageText(text) {
						const results = [];

						const moves = text.match(/\[move\s*(.+?)\s*]/);
						if (moves) {
							for (const move of moves) {
						  		results.push(move);
							}
						}
						
						const route = text.match(/^-.*?:\s*([^\s:].*?)(?=\s*:|$)/);
						if (route) {
						  const action = route[1].match(/(=|\+|-|\*|\/| is | roll | chance )/);
						
						  if (!action) {
							results.push(route[1]); 
						  }
						}

						return results;
					}
				}
			}
		}
	}
});