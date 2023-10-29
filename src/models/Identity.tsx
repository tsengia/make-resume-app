import { makeAutoObservable } from "mobx";

class IdentityModel {
    name: {
        first: string,
        middle: string,
        last: string
    }
    contact: {
        phone: string,
        email: string,
        url: string
    }
    address: {
        firstLine: string,
        secondLine: string
    }

    constructor() {
        this.name = {
            first: "John",
            middle: "Henry",
            last: "Doe"
        };
        this.contact = {
            phone: "1-(000)-123-4567",
            email: "nobody@example.com",
            url: "https://example.com"
        };
        this.address = {
            firstLine: "100 Nowhere Lane",
            secondLine: "12345 Harrisburg, PA"
        }

        makeAutoObservable(this);
    }

    load(input: IdentityModel) {
        this.name = input.name;
        this.contact = input.contact;
        this.address = input.address;
    }
}

export default IdentityModel;