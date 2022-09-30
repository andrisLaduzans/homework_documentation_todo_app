export const neverReach = (item: never) => {
    throw new Error(item);
}