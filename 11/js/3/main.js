let mounth = Number(window.prompt("enter a number, please"));

switch(mounth){
    case 12:
    case 1:
    case 2:
        alert("Winter");
        break;
    case 3:
    case 4:
    case 5:
        alert("Spring");
        break;
    case 6:
    case 7:
    case 8:
        alert("Summer");
        break;
    case 9:
    case 10:
    case 11:
        alert("Autumn");
        break;
    default:
        alert("invalid input")
}

