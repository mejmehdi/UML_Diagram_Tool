// src/components/ClassElement.js
import React, { useState } from 'react';

const ClassElement = ({ addClass }) => {
  const [className, setClassName] = useState('');
  const [attributes, setAttributes] = useState('');
  const [methods, setMethods] = useState('');
  const [attributeVisibility, setAttributeVisibility] = useState('private');

  const handleAddClass = () => {
    const newClass = {
      name: className,
      attributes: attributes.split(',').map(attr => ({
        name: attr.trim(),
        visibility: attributeVisibility,
      })),
      methods: methods.split(',').map(method => method.trim()),
    };

    addClass(newClass);
    setClassName('');
    setAttributes('');
    setMethods('');
    setAttributeVisibility('private');
  };

  return (
    <div className="class-element">
      <div>
        <label>Nom de la classe :</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Nom de la classe"
        />
      </div>
      <div>
        <label>Attributs (séparés par des virgules) :</label>
        <input
          type="text"
          value={attributes}
          onChange={(e) => setAttributes(e.target.value)}
          placeholder="Ex: nom, age"
        />
      </div>
      <div>
        <label>Méthodes (séparées par des virgules) :</label>
        <input
          type="text"
          value={methods}
          onChange={(e) => setMethods(e.target.value)}
          placeholder="Ex: afficher(), getAge()"
        />
      </div>
      <div>
        <label>Visibilité des attributs :</label>
        <select
          value={attributeVisibility}
          onChange={(e) => setAttributeVisibility(e.target.value)}
        >
          <option value="private">Privé (-)</option>
          <option value="public">Public (+)</option>
          <option value="protected">Protégé (#)</option>
        </select>
      </div>
      <button onClick={handleAddClass}>Ajouter Classe</button>
    </div>
  );
};

export default ClassElement;
