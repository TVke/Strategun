function Coords(){

}

Coords.neighbours = function(x, y){
    return {
        Right: [x, y+1],
        Left: [x, y-1],
        Top: [x+1, y],
        Bottom: [x-1, y]
    }
}