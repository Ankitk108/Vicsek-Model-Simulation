# Vicsek Model Simulation

A JavaScript-based simulation of the Vicsek model, showcasing collective behavior and self-organization in particle systems. The project includes interactive controls to modify simulation parameters and visualize the effects in real time.

## Features
- **Play/Pause Simulation**: Start or pause the simulation.
- **Dynamic Controls**: Adjust parameters such as interaction radius, particle speed, and noise.
- **Restart Button**: Regenerate the simulation with a new set of random particles.

## JavaScript Code Breakdown

### Particle Class
Represents individual particles with attributes:
- **x, y**: Position on the canvas.
- **angle**: Direction of movement.
Includes a `move()` method to update the particle's position based on its angle and speed.

### Core Functions
#### `createParticles()`
Generates a randomized set of particles with initial positions and directions.

#### `getNeighbors(particle)`
Identifies particles within a defined radius of the given particle.

#### `getAverageAngle(particle, neighbors)`
Computes the average direction of neighbors to align the particle's direction.

#### `update()`
Updates each particle's angle based on the average direction of neighbors, with added randomness (noise), and moves them accordingly.

#### `draw()`
Clears the canvas and draws particles as small circles.

#### `loop()`
Runs the simulation, updating and drawing particles continuously. Pauses if the simulation is toggled off.

### Interactive Controls
#### Play/Pause Button
Toggles the `running` state, controlling whether the simulation updates.

#### Restart Button
Resets the simulation with a fresh set of randomized particles.

#### Sliders
1. **Radius**: Adjusts the interaction range for neighbor detection.
2. **Speed**: Changes particle movement speed.
3. **Noise**: Controls randomness in direction changes.

### Event Listeners
- Buttons and sliders are linked to functions that modify simulation parameters in real time.

## Usage
1. Open `index.html` in a web browser.
2. Use the provided controls to interact with the simulation:
   - Start or stop the animation.
   - Adjust sliders to observe effects on behavior.
   - Restart the simulation to generate a new particle set.

## References
This project is inspired by concepts from the Vicsek model. For more details, refer to the article:  
[Original Reference Material](https://thebiophysicist.kglmeridian.com/view/journals/biop/4/1/article-p30.xml#d7328640e311)

## Future Improvements
- Add more particle interaction rules.
- Implement additional visualization options.
- Optimize performance for larger particle systems.

Enjoy experimenting with the Vicsek model simulation!
