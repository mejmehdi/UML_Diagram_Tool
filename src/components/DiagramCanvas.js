// src/components/DiagramCanvas.js
import React, { useEffect } from 'react';
import * as joint from '@joint/core';
import RelationshipEditor from './RelationshipEditor'
import {cardinality1,cardinality2} from './RelationshipEditor';


const DiagramCanvas = ({ classes, relationships }) => {
  useEffect(() => {
    const graph = new joint.dia.Graph();

    // Initialisation de la zone du diagramme
    const paper = new joint.dia.Paper({
      el: document.getElementById('diagram-canvas'),
      width: '100%',
      height: 600,
      model: graph,
      gridSize: 10,
      drawGrid: true,
      background: { color: '#f4f7f9' },
      interactive: true,
    });

    // Fonction pour créer une classe UML avec sections
    const createUMLClass = (cls, x, y) => {
      const rectWidth = 240;
      const headerHeight = 30;
      const attributesHeight = Math.max(cls.attributes.length * 20, 20);
      const methodsHeight = Math.max(cls.methods.length * 20, 20);
      const totalHeight = headerHeight + attributesHeight + methodsHeight;

      const umlClass = new joint.shapes.standard.Rectangle();
      umlClass.position(x, y);
      umlClass.resize(rectWidth, totalHeight);

      // Texte de la classe (nom, attributs, méthodes)
      const className = `${cls.name}`;
      const classAttributes = cls.attributes
        .map((attr) => `${getVisibilitySymbol(attr.visibility)} ${attr.name}`)
        .join('\n');
      const classMethods = cls.methods.join('\n');

      // Attributs visuels de la classe
      umlClass.attr({
        body: {
          fill: '#ffffff',
          stroke: '#000000',
          strokeWidth: 1,
          rx: 5,
          ry: 5,
        },
        label: {
          text: `${className}\n-----------------\n${classAttributes || '(Aucun attribut)'}\n-----------------\n${classMethods || '(Aucune méthode)'}`,
          fill: '#000000',
          fontSize: 14,
          textWrap: {
            width: -10, // Ajuste le texte à la largeur
          },
        },
      });

      umlClass.addTo(graph);
      return umlClass;
    };

    // Ajouter les classes UML au graphe
    const classElements = classes.map((cls, index) =>
      createUMLClass(cls, 100 + index * 300, 100)
    );

    // Ajouter les relations UML
    relationships.forEach((relationship) => {
      const sourceIndex = classes.findIndex((cls) => cls.name === relationship.class1);
      const targetIndex = classes.findIndex((cls) => cls.name === relationship.class2);

      if (sourceIndex === -1 || targetIndex === -1) {
        console.error('Classes source ou cible introuvables pour la relation:', relationship);
        return;
      }

      const link = new joint.shapes.standard.Link();
      link.source(classElements[sourceIndex]);
      link.target(classElements[targetIndex]);

      // Appliquer le style en fonction du type de relation
      switch (relationship.relationType) {
        case 'Héritage':
          link.attr({
            line: {
              stroke: '#000000',
              strokeWidth: 2,
              targetMarker: {
                type: 'path',
                d: 'M 10 -5 L 0 0 L 10 5 Z', // Triangle vide
                fill: 'none',
                stroke: '#000000',
              },
            },
          });
          break;

        case 'Composition':
          link.attr({
            line: {
              stroke: '#000000',
              strokeWidth: 2,
              sourceMarker: {
                type: 'path',
                d: 'M -10 -5 L 0 0 L -10 5 Z', // Losange plein
                fill: '#000000',
                stroke: '#000000',
              },
              targetMarker: {
                type: 'path',
                d: 'M 10 -5 L 0 0 L 10 5 Z',
              },
            },
          });
          break;

        case 'Agrégation':
          link.attr({
            line: {
              stroke: '#000000',
              strokeWidth: 2,
              sourceMarker: {
                type: 'path',
                d: 'M -10 -5 L 0 0 L -10 5 Z', // Losange vide
                fill: 'none',
                stroke: '#000000',
              },
              targetMarker: {
                type: 'path',
                d: 'M 10 -5 L 0 0 L 10 5 Z',
              },
            },
          });
          break;

          case 'Association':
  default:
    link.attr({
      line: {
        stroke: '#000000',
        strokeWidth: 2,
        targetMarker: {
          type: 'path',
          d: 'M 10 -5 L 0 0 L 10 5 Z', // Flèche simple
        },
      },
    });

    // Ajouter les étiquettes pour les cardinalités
    if (relationship.cardinality1) {
      link.appendLabel({
        attrs: {
          text: {
            text: relationship.cardinality1, // Affiche cardinalité 1
            fill: '#000000',
            fontSize: 12,
            fontWeight: 'bold',
          },
          rect: {
            fill: '#FFFFFF', // Fond blanc pour la lisibilité
            stroke: '#000000',
            strokeWidth: 1,
            rx: 5,
            ry: 5,
          },
        },
        position: {
          distance: 0.2, // Position vers la queue de la flèche
        },
      });
    }

    if (relationship.cardinality2) {
      link.appendLabel({
        attrs: {
          text: {
            text: relationship.cardinality2, // Affiche cardinalité 2
            fill: '#000000',
            fontSize: 12,
            fontWeight: 'bold',
          },
          rect: {
            fill: '#FFFFFF', // Fond blanc pour la lisibilité
            stroke: '#000000',
            strokeWidth: 1,
            rx: 5,
            ry: 5,
          },
        },
        position: {
          distance: 0.8, // Position vers la tête de la flèche
        },
      });
    }
    break;

            
      }

      link.addTo(graph);
    });
  }, [classes, relationships]);

  // Fonction pour obtenir le symbole de visibilité
  const getVisibilitySymbol = (visibility) => {
    switch (visibility) {
      case 'public':
        return '+';
      case 'protected':
        return '#';
      default:
        return '-'; // private
    }
  };

  return (
    <div
      id="diagram-canvas"
      style={{
        marginTop: '20px',
        width: '100%',
        height: '600px',
        backgroundColor: '#f4f7f9',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default DiagramCanvas;
