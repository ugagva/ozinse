


export const shuffle=(arr:[]) => [...arr].sort(() => 0.5 - Math.random());


export const buildUrl=(url:string, params:object) => {

    let urlWithParams = url;
    Object.entries(params).forEach(([key, value], index) => {
        const sign= !index ? '?' : '&'
        urlWithParams+= `${sign}${key}=${value}`
    })
    return urlWithParams
}

export const sumBy=(arr:[])=> arr.reduce((prev,cur) => prev+cur, 0)