


export function getImageURL(name:string) {
    return new URL(`/images/${name}`,import.meta.url).toString();
}
