// src/App.js
import React, { useState } from 'react';
import DiagramCanvas from './components/DiagramCanvas';
import ClassElement from './components/ClassElement';
import RelationshipEditor from './components/RelationshipEditor';
import CodeGeneration from './components/CodeGeneration';



import './App.css';

const App = () => {
  const [classes, setClasses] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [language, setLanguage] = useState('Java'); // Langage de génération (Java par défaut)

  const addClass = (newClass) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };

  const addRelationship = (relationship) => {
    setRelationships((prevRelationships) => [
      ...prevRelationships,
      relationship,
    ]);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1>Diagramme UML</h1>
      </header>

      <div className="content">
        {/* Ajouter une classe UML */}
        <div className="class-creation">
          <h2>Créer une classe UML</h2>
          <ClassElement addClass={addClass} />
        </div>

        {/* Ajouter des relations entre les classes */}
        <div className="relationship-creation">
          <h2>Créer une relation entre les classes</h2>
          <RelationshipEditor classes={classes} addRelationship={addRelationship} />
        </div>

        {/* Afficher le diagramme UML */}
        <div className="diagram">
          <h2>Diagramme UML</h2>
          <DiagramCanvas classes={classes} relationships={relationships} />
        </div>

        {/* Sélectionner le langage de génération */}
        <div className="language-selection">
          <label htmlFor="language">Choisir le langage :</label>
          <select id="language" value={language} onChange={handleLanguageChange}>
            <option value="Java">Java</option>
            <option value="PHP">PHP</option>
            <option value="Python">Python</option>
          </select>
        </div>

        {/* Générer le code */}
        <CodeGeneration classes={classes} relationships={relationships} language={language} />
      </div>
    </div>
  );
};

export default App;
