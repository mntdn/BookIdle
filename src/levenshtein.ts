
export function levDist(a: string, b: string){
    var m: number = Math.min(a.length, b.length);
    var n: number = Math.max(a.length, b.length);
    var v0:number[] = [];
    var v1:number[] = [];
    for (let i = 0; i <= n; i++) {
        v0[i] = i;        
    }
    for(let i = 0; i < m; i++){
        v1[0] = i + 1;
        for(let j = 0; j < n; j++){
            let deletionCost = v0[j+1] + 1;
            let insertionCost = v1[j] + 1;
            let substitutionCost = 0;
            if(a[i] === b[j])
                substitutionCost = v0[j];
            else
                substitutionCost = v0[j] + 1;
            v1[j+1] = Math.min(deletionCost, insertionCost, substitutionCost);
        }
        let temp = v0;
        v0 = v1;
        v1 = temp;
    }
    return v0[n];
}