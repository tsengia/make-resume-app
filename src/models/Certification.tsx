import { makeAutoObservable } from "mobx";
import dayjs, { Dayjs } from "dayjs";

class CertificationModel {
    institution: string;
    certified_date: Dayjs;
    is_expired: boolean;
    expired_date?: Dayjs;
    location: string;
    name: string;
    id: string;

    constructor() {
        this.institution = "";
        this.certified_date = dayjs();
        this.is_expired = false;
        this.location = "";
        this.name = "";
        this.id = "";

        makeAutoObservable(this);
    }

    load(input: CertificationModel) {
        this.id = input.id;
        this.name = input.name;
        this.location = input.location;
        if (input.expired_date) {
            this.expired_date = dayjs(input.expired_date);
        }
        this.is_expired = input.is_expired;
        this.certified_date = dayjs(input.certified_date);
        this.institution = input.institution;
    }
}

export default CertificationModel;