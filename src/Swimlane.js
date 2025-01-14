import React from 'react';
import Card from './Card';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import './Swimlane.css';

export default class Swimlane extends React.Component {
  componentDidMount() {
    const containers = Array.from(document.querySelectorAll('.Swimlane-dragColumn'));

    dragula(containers)
      .on('drag', (el) => {
        const originalColor = el.style.backgroundColor;
        el.dataset.originalColor = originalColor;
        el.style.transition = 'background-color 0.3s ease';
        el.style.backgroundColor = 'lightgrey';
        el.style.color = 'black';
      })

      .on('drop', (el, target) => {
        if (target.parentElement.classList.contains('Swimlane-column')) {
          const swimlaneName = target.parentElement.querySelector('.Swimlane-title').textContent;

          if (swimlaneName === 'Backlog') {
            el.style.backgroundColor = 'rgba(167, 158, 158, 0.671)';
            el.style.color = 'black';
          } else if (swimlaneName === 'In Progress') {
            el.style.backgroundColor = 'skyblue';
            el.style.color = 'white';
          } else if (swimlaneName === 'Complete') {
            el.style.backgroundColor = 'rgb(150, 190, 150)';
            el.style.color = 'white';
          }
        } else {
          el.style.backgroundColor = el.dataset.originalColor || 'lightgrey';
          el.style.color = 'black';
        }
      })

      .on('cancel', (el) => {
        el.style.backgroundColor = el.dataset.originalColor || 'lightgrey';
        el.style.color = 'black';
      });
  }

  render() {
    const cards = this.props.clients.map(client => {
      return (
        <Card
          key={client.id}
          id={client.id}
          name={client.name}
          description={client.description}
          status={client.status}
        />
      );
    });

    return (
      <div className="Swimlane-column">
        <div className="Swimlane-title">{this.props.name}</div>
        <div className="Swimlane-dragColumn" ref={this.props.dragulaRef}>
          {cards}
        </div>
      </div>
    );
  }
}
