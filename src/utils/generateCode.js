// src/utils/generateCode.js
export const generateCode = (classes, language) => {
    let code = '';
    
    classes.forEach(cls => {
      code += `class ${cls.name} {\n`;
  
      // Attributs
      cls.attributes.forEach(attr => {
        if (language === 'Java') {
          code += `  private ${attr};\n`;
        } else if (language === 'PHP') {
          code += `  private $${attr};\n`;
        } else if (language === 'Python') {
          code += `  self.${attr} = None\n`;
        }
      });
  
      // Méthodes
      cls.methods.forEach(method => {
        if (language === 'Java') {
          code += `  public void ${method}() {\n    // TODO: implémenter ${method}\n  }\n`;
        } else if (language === 'PHP') {
          code += `  public function ${method}() {\n    // TODO: implémenter ${method}\n  }\n`;
        } else if (language === 'Python') {
          code += `  def ${method}(self):\n    # TODO: implémenter ${method}\n`;
        }
      });
  
      code += `}\n\n`;
    });
  
    return code;
  };
  