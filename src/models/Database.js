const fs = require('fs');

class Database {
    constructor(dbName) {
        this.dbName = dbName;
        this.fileName = `./database/${this.dbName}.json`;
    }

    getData() {
        const readData = fs.readFileSync(this.fileName, 'utf-8');
        return JSON.parse(readData);
    }

    generateId() {
        let allData = this.findAll();
        const lastData = allData.pop();
        if (lastData) {
            return lastData.id + 1;
        }
        return 1;
    }

    findAll() {
        return this.getData;
    }

    findByPk(id) {
        const allData = this.findAll();
        const dataFound = allData.find(data => data.id === id);
        return dataFound;
    }

    findByField(field, value) {
        const allData = this.findAll();
        const dataFound = allData.find(data => data[field] === value);
        return dataFound;
    }

    create(data) {
        let allData = this.findAll();
        const newItem = {
            id: this.generateId,
            ...data
        }

        allData.push(newItem);
        const newDataToJSON = JSON.stringify(allData);
        fs.writeFileSync(this.fileName, newDataToJSON);
        return newItem;
    }

    delete(id) {
        const allData = this.findAll();
        const finalData = allData.filter(data => data.id !== id);
        const finalDataToJSON = JSON.stringify(finalData);
        fs.writeFileSync(this.fileName, finalDataToJSON);
        return true;
    }


}

module.exports = Database;