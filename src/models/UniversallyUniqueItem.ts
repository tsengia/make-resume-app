import { makeAutoObservable } from "mobx";

export class UniversallyUniqueItem<StoredType> {
    uuid: string
    value: StoredType

    constructor(value: StoredType) {
        this.uuid = crypto.randomUUID();
        this.value = value;

        makeAutoObservable(this);
    }
}

export class UUList<StoredType> {
    data: UniversallyUniqueItem<StoredType>[]

    constructor() {
        this.data = [];
        makeAutoObservable(this);
    }

    has(uuid: string): boolean {
        return this.data.find((value, _1, _2)=>value.uuid == uuid) !== undefined;
    }

    add(item: StoredType): UniversallyUniqueItem<StoredType> {
        let new_item = new UniversallyUniqueItem<StoredType>(item);
        this.data.push(new_item);
        return new_item;
    }

    remove(uuid: string): void {
        this.data = this.data.filter((value, _1, _2)=>value.uuid!=uuid);
    }

    get(uuid: string): (StoredType | undefined) {
        return this.data.find((value, _1, _2)=>value.uuid==uuid)?.value
    }

    set(uuid: string, value: StoredType): void {
        let a = this.data.find((value,_1,_2)=>value.uuid==uuid);
        if (a) {
            a.value = value;
        }
        else {
            let i = new UniversallyUniqueItem<StoredType>(value);
            i.uuid = uuid;
            this.data.push(i);
        }
    }

    map(mapper: (item: UniversallyUniqueItem<StoredType>, index: number, data: UniversallyUniqueItem<StoredType>[]) => any) {
        return this.data.map(mapper);
    }

    load(input: UUList<StoredType>, ctor?: new() => StoredType): void {
        this.data = [];
        for (let i = 0; i < input.data.length; i++) {
            let a = input.data[i];
            if (ctor !== undefined) {
                let v = new ctor();
                v.load(input.data[i].value);
                a.value = v;
            }
            this.data.push(a);
        }
    }

    [Symbol.iterator]() {
        let index = 0;

        return {

            next: () => {
                if (index < this.data.length) {
                    return { value: this.data[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        }
    }
}

export default UUList;