


export function getImageURL(name:string) {
    return new URL(`../../../public/images/${name}`,import.meta.url).toString();
}
