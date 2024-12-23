import React, { useState } from 'react';

const RelationshipEditor = ({ classes, addRelationship }) => {
  const [selectedClass1, setSelectedClass1] = useState('');
  const [selectedClass2, setSelectedClass2] = useState('');
  const [relationType, setRelationType] = useState('');
  const [cardinality1, setCardinality1] = useState('');
  const [cardinality2, setCardinality2] = useState('');

  const handleAddRelationship = () => {
    if (selectedClass1 && selectedClass2 && relationType) {
      const relationship = {
        class1: selectedClass1,
        class2: selectedClass2,
        relationType: relationType,
      };

      // Ajouter les cardinalités si le type est Association
      if (relationType === 'Association') {
        relationship.cardinality1 = cardinality1;
        relationship.cardinality2 = cardinality2;
      }

      addRelationship(relationship);

      // Réinitialiser les champs
      setSelectedClass1('');
      setSelectedClass2('');
      setRelationType('');
      setCardinality1('');
      setCardinality2('');
    }
  };

  return (
    <div className="relationship-editor">
      <h3>Ajouter une Relation</h3>

      <div className="section">
        <label>Classe source :</label>
        <select value={selectedClass1} onChange={(e) => setSelectedClass1(e.target.value)}>
          <option value="">Sélectionner une classe</option>
          {classes.map((cls) => (
            <option key={cls.name} value={cls.name}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      <div className="section">
        <label>Classe cible :</label>
        <select value={selectedClass2} onChange={(e) => setSelectedClass2(e.target.value)}>
          <option value="">Sélectionner une classe</option>
          {classes.map((cls) => (
            <option key={cls.name} value={cls.name}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      <div className="section">
        <label>Type de relation :</label>
        <select value={relationType} onChange={(e) => setRelationType(e.target.value)}>
          <option value="">Sélectionner un type de relation</option>
          <option value="Héritage">Héritage</option>
          <option value="Agrégation">Agrégation</option>
          <option value="Composition">Composition</option>
          <option value="Association">Association</option>
        </select>
      </div>

      {/* Champs de cardinalité pour Association */}
      {relationType === 'Association' && (
        <div className="cardinality-section">
          <div>
            <label>Cardinalité (Classe source) :</label>
            <input
              type="text"
              value={cardinality1}
              onChange={(e) => setCardinality1(e.target.value)}
            />
          </div>
          <div>
            <label>Cardinalité (Classe cible) :</label>
            <input
              type="text"
              value={cardinality2}
              onChange={(e) => setCardinality2(e.target.value)}
            />
          </div>
        </div>
      )}

      <button onClick={handleAddRelationship}>Ajouter Relation</button>
    </div>
  );
};

export default RelationshipEditor;
