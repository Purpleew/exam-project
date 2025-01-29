function createSticker(sticker, xPosition = 100, yPosition = 100) {
      fetch(sticker.svg)
        .then(res => res.text())
        .then(svg => {
          // Body Creation

          // Save a blank array of vertex sets.
          const vertexSets = [];

          // Use the dom parser to parse our svg.
          const parser = new DOMParser();
          const htmlDocument = parser.parseFromString(svg, 'text/html');

          // Query the svg paths and loop through each to get the vertices.
          const paths = htmlDocument.documentElement.querySelectorAll('path');
          [...paths].forEach(path => {
            // Convert path into array of vector points.
            const points = Svg.pathToVertices(path, 10);

            // Push the points into the vertex set.
            vertexSets.push(Vertices.scale(points, 0.8, 0.8));
          });

          // Add the svg to the world.
          const stickerBody = Bodies.fromVertices(
            xPosition,
            yPosition,
            vertexSets,
            {
              restitution: 0.8,
              render: {
                fillStyle: '#FFFFFF',
                strokeStyle: '#FF0000',
                lineWidth: 2,
              },
            },
            true,
          );

          World.add(engine.world, stickerBody);
        });
    }