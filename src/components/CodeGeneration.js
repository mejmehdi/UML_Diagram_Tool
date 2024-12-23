import React from 'react';

const CodeGeneration = ({ classes, relationships, language }) => {
  const generateCode = () => {
    let code = '';
    if (language === 'Java') {
      code = generateJavaCode();
    } else if (language === 'PHP') {
      code = generatePhpCode();
    } else if (language === 'Python') {
      code = generatePythonCode();
    }
    return code;
  };

  const generateJavaCode = () => {
    let javaCode = '';

    // Ajouter les relations en premier
    relationships.forEach((rel) => {
      if (rel.relationType === 'Héritage') {
        javaCode += `${rel.class1} extends ${rel.class2} {\n}\n`;
      } else if (rel.relationType === 'Agrégation') {
        javaCode += `${rel.class1} has a ${rel.class2} (Aggregation)\n\n`;
      } else if (rel.relationType === 'Composition') {
        javaCode += `${rel.class1} has a ${rel.class2} (Composition)\n\n`;
      } else if (rel.relationType === 'Association') {
        javaCode += `${rel.class1} is associated with ${rel.class2} (Association)\n\n`;
      }
    });

    // Ajouter les classes
    classes.forEach((cls) => {
      javaCode += `class ${cls.name} {\n`;
      cls.attributes.forEach((attr) => {
        javaCode += `  ${getJavaVisibility(attr.visibility)} ${attr.name};\n`;
      });
      javaCode += '\n';
      cls.methods.forEach((method) => {
        javaCode += `  public void ${method}() {\n    // TODO: Implement method\n  }\n\n`;
      });
      javaCode += '}\n\n';
    });

    return javaCode;
  };

  const generatePhpCode = () => {
    let phpCode = '';

    // Ajouter les relations en premier
    relationships.forEach((rel) => {
      if (rel.relationType === 'Héritage') {
        phpCode += `class ${rel.class1} extends ${rel.class2} {\n}\n`;
      } else if (rel.relationType === 'Agrégation') {
        phpCode += `${rel.class1} has a ${rel.class2} (Aggregation)\n\n`;
      } else if (rel.relationType === 'Composition') {
        phpCode += `${rel.class1} has a ${rel.class2} (Composition)\n\n`;
      } else if (rel.relationType === 'Association') {
        phpCode += `${rel.class1} is associated with ${rel.class2} (Association)\n\n`;
      }
    });

    // Ajouter les classes
    classes.forEach((cls) => {
      phpCode += `class ${cls.name} {\n`;
      cls.attributes.forEach((attr) => {
        phpCode += `  public ${attr.name};\n`;
      });
      phpCode += '\n';
      cls.methods.forEach((method) => {
        phpCode += `  public function ${method}() {\n    // TODO: Implement method\n  }\n\n`;
      });
      phpCode += '}\n\n';
    });

    return phpCode;
  };

  const generatePythonCode = () => {
    let pythonCode = '';

    // Ajouter les relations en premier
    relationships.forEach((rel) => {
      if (rel.relationType === 'Héritage') {
        pythonCode += `class ${rel.class1}(${rel.class2}):\n    pass\n\n`;
      } else if (rel.relationType === 'Agrégation') {
        pythonCode += `${rel.class1} has a ${rel.class2} (Aggregation)\n\n`;
      } else if (rel.relationType === 'Composition') {
        pythonCode += `${rel.class1} has a ${rel.class2} (Composition)\n\n`;
      } else if (rel.relationType === 'Association') {
        pythonCode += `${rel.class1} is associated with ${rel.class2} (Association)\n\n`;
      }
    });

    // Ajouter les classes
    classes.forEach((cls) => {
      pythonCode += `class ${cls.name}:\n`;
      cls.attributes.forEach((attr) => {
        pythonCode += `  ${attr.name} = None  # ${getPythonVisibility(attr.visibility)}\n`;
      });
      pythonCode += '\n';
      cls.methods.forEach((method) => {
        pythonCode += `  def ${method}(self):\n    # TODO: Implement method\n\n`;
      });
      pythonCode += '\n';
    });

    return pythonCode;
  };

  const getJavaVisibility = (visibility) => {
    switch (visibility) {
      case 'public': return 'public';
      case 'protected': return 'protected';
      default: return 'private';
    }
  };

  const getPythonVisibility = (visibility) => {
    switch (visibility) {
      case 'public': return 'public';
      case 'protected': return 'protected';
      default: return 'private';
    }
  };

  return (
    <div className="code-generation">
      <h2>Génération de code ({language})</h2>
      <pre>{generateCode()}</pre>
    </div>
  );
};

export default CodeGeneration;
