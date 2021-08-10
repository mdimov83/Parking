class Parking{

    constructor(capacity){
        this.capacity = capacity;
        this.vehicles = [];
    }

    addCar(carModel, carNumber){
        if(this.capacity < 1){
            throw new Error('Not enough parking space.');
        }
        let car = {
            carModel: carModel,
            carNumber: carNumber,
            payed: false,
        };
        this.vehicles.push(car);
        this.capacity--;
        return `The ${carModel}, with a registration number ${carNumber}, parked.`;
    }
    removeCar(carNumber){
        let car = this.vehicles.find(c => c.carNumber === carNumber);
        if(car === undefined){
            throw new Error("The car, you're looking for, is not found.");
        }
        if(car.payed == false){
            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`);
        }
        let index = this.vehicles.indexOf(car);
        this.vehicles.splice(index, 1);
        this.capacity++;
        return `${carNumber} left the parking lot.`;
    }
    pay(carNumber){
        let car = this.vehicles.find(c => c.carNumber === carNumber);
        if(car === undefined){
            throw new Error("The car, you're looking for, is not found.");
        }
        if(car.payed == true){
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        }
        this.vehicles.find(c => c.carNumber === carNumber).payed = true;
        return `${carNumber}'s driver successfully payed for his stay.`;
    }
    getStatistics(carNumber) {
        if(carNumber === undefined || this.vehicles.find(c => c.carNumber === carNumber) === undefined){
            let sortedArray = this.vehicles.sort((a,b) => a.carModel.localeCompare(b.carModel));
            let firstLine = `The Parking Lot has ${this.capacity} empty spots left.\n`
            let secondLines = '';
            sortedArray.forEach(c => {secondLines += `${c.carModel} == ${c.carNumber} - ${c.payed == true ? 'Has payed' : 'Not payed'}\n`
            });
            return firstLine + secondLines;
        }
        let car = this.vehicles.find(c => c.carNumber === carNumber);
        return `${car.carModel} == ${car.carNumber} - ${car.payed == true ? 'Has payed' : 'Not payed'}\n`

    }
}
const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
console.log(parking.getStatistics());
