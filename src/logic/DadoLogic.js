

export const GetRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const RollD6 = () => {
    return GetRandomInt(1,6);
}

export const Roll6D6 = () => {
    return [RollD6(), RollD6(), RollD6(), RollD6(), RollD6(), RollD6()].sort();
}

