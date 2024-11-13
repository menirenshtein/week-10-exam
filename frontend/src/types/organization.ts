interface Organization {
    name:string,
    resources: [
        {
        name:string,
        amount:number
        },
        {
        name:string,
        amount:number
        }
    ],
    budget: number    
}

export default Organization