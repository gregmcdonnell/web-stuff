export class TrafficSim {
    /**
     * Creates an instance of TrafficSim.
     * @param {int} nCars - The number of cars to start the sim with.
     */
    constructor(nCars) {
        this.nCars = nCars;
        /** @type {Car[]} */
        this.cars = [];
        this.aggression = 1;
        this.initCars(nCars);
    }

    initCars(nCars) {
        this.nCars = nCars;
        this.cars = [];
        for (let i = 0; i < nCars; i++) {
            const pos = i / nCars + Math.random() * 0.01;
            this.cars.push(new Car(pos % 1.0));
        }
    }

    update(dt) {
        // calculate car accelerations
        for (let i = 0; i < this.nCars; i++) {
            const car = this.cars[i];
            const nextCar = this.cars[(i + 1) % this.nCars]
            let distance;
            if (nextCar.pos < car.pos)
                distance = nextCar.pos + 1.0 - car.pos;
            else 
                distance = nextCar.pos - car.pos;
            if (distance < 0.01)
                car.pos = (nextCar.pos - 0.01) % 1
            car.distToNextCar = distance;
            let acc = car.targetSpeed - car.speed;
            acc += distance - car.targetDistance;
            car.acc = acc * this.aggression;
        }

        // Update car positions
        for (let i = 0; i < this.nCars; i++) {
            this.cars[i].step(dt);
        }
    }
}

class Car {
    constructor(startPos) {
        this.pos = startPos;
        this.speed = 0.0;
        this.acc = 0.0;
        this.nAware = 1;
        this.distToNextCar = 0.0;
        this.targetSpeed = 0.05;
        this.targetDistance = 0.02;
    }

    step(dt) {
        this.speed = Math.max(0, this.speed + this.acc * dt);
        this.pos = (this.pos + this.speed * dt) % 1.0;
    }
}