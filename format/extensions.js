window.storyFormat({
  "name": "PassageFormat",
  "version": "1.0.0",
  "editorExtensions": {
	"twine": {
	"^2.4.0-alpha1": {
			"references": {
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