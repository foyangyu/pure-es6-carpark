import { Store } from '../store';
import '../index.css';

/* Creating a grid as container */
export const generateParkContainer = (el) => {
    let container = document.createElement("div");
    container.id = "park-container";
    container.className = "grid";
    const parkSize = Store.getState().parkSize;
    
    for (let i = 0; i < parkSize; i += 1) {
        let row = document.createElement("div");
        row.className = "row";
        row.id = "row" + i;

        for (let k = 0; k < parkSize; k += 1) {
            let box = document.createElement("div");
            box.className = "box";
            box.id = "Coordinate" + k + ',' + (parkSize - i - 1); // Make id match the coordinate
            // Add to row
            row.appendChild(box);
        }
        // Add to the park container
        container.appendChild(row);
    }
    // Add to the parent node 'main'. Could be document.body as well.
    el.appendChild(container);
};

export const renderBusInPark = () => {
    const buses = Store.getState().buses;
    const busesLen = buses.length;
    buses.map((bus, i) => {
        const box = document.getElementById("Coordinate" + bus.posX + "," + bus.posY);
        let img = document.createElement("i");
        img.className = `fa fa-bus inner rotate-${(bus.direction).toLowerCase()}`;
        box.appendChild(img);
        if (busesLen === i + 1) img.className += ' selected'; // last bus have selected style
    });
};

export const removeOldBus = () => {
    // If elements get too much, could maintain a previousState in Store to solve
    const boxes = document.getElementsByClassName("box");
    for(let i = 0; i < boxes.length; i++) {
        while (boxes[i].firstChild) {
            boxes[i].removeChild(boxes[i].firstChild);
        }
    }
};