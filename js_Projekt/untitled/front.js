// Add event listeners

//30 48 50 32
c = document.querySelector("#myCanvas")
playerCanvas = document.querySelector("#playerCanvas")
betoltendoKep = document.querySelector("#betoltendoKep")
ctxKep = betoltendoKep.getContext("2d")
ctx = c.getContext("2d")
playerCtx = playerCanvas.getContext("2d")

const jobbraNyil = document.getElementById('jobbranyil');
const balraNyil = document.getElementById('balranyil');
const lefeleNyil = document.getElementById('lefelenyil');
const felfeleNyil = document.getElementById('felfelenyil');
const elagazas = document.getElementById('elagazas');
const egyenes = document.getElementById('egyenes');
const kanyar = document.getElementById('kanyar');

const cordinates= []
const lefele = []
const felfele = []
const balra = []
const jobbra = []
const keret = []
const kimaradt = {
    img: {
        name: "valami",
        exits: {
            fel: false,
            le: false,
            balra: false,
            jobbra: false
        },
        rotate: 0
    }
}
const fixPoziciok = [10,12,14,16,28,34,46,52,64,66,68,70,30,48,50,32]
const szelek = [10,16,70,64]
const players=[]
const pirosKincs = []
const kekKincs = []
const zoldKincs = []
const citromKincs = []

let mozgatott = false
let vege = false


// Jatekleiras mutatasa
function showGameRules() {
    button = document.querySelector("#leirasMutatasGomb")
    szoveg = document.querySelector("#gameRules")
    if( button.innerHTML === "Jatekleiras mutatasa" ){
        szoveg.style.display = 'block';
        button.innerHTML = "Jatekleiras eltuntetese"
    } else if(button.innerHTML === "Jatekleiras eltuntetese") {
        szoveg.style.display = 'none';
        button.innerHTML = "Jatekleiras mutatasa"
    }
}

// Funkciok
function kezdoBeallitas(i) {
    ctx.beginPath();
    tomb = randomImg()
    cordinates[i].img.name = tomb.name
    cordinates[i].img.rotate = tomb.rotate
    if(cordinates[i].img.name === "egyenes") {
        switch (cordinates[i].img.rotate) {
            case 0:
                cordinates[i].img.exits.balra = true
                cordinates[i].img.exits.jobbra = true
                let elsoImg = new Image();
                elsoImg.addEventListener('load', function () {
                    ctx.drawImage(elsoImg, cordinates[i].x, cordinates[i].y);
                }, false);
                elsoImg.src = 'kepek/utak/egyenesek/egyenes_0.png';
                break;
            case 90:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.le = true
                const masodikImg = new Image();
                masodikImg.addEventListener('load', function () {
                    ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
                }, false);

                masodikImg.src = 'kepek/utak/egyenesek/egyenes_1.png';
                break;
            case 180:
                cordinates[i].img.exits.balra = true
                cordinates[i].img.exits.jobbra = true
                const harmadikImg = new Image();
                harmadikImg.addEventListener('load', function () {
                    ctx.drawImage(harmadikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                harmadikImg.src = 'kepek/utak/egyenesek/egyenes_0.png';
                break;
            case 270:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.le = true
                let negyedikImg = new Image();
                negyedikImg.addEventListener('load', function () {
                    ctx.drawImage(negyedikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                negyedikImg.src = 'kepek/utak/egyenesek/egyenes_1.png';
                break;
        }
    }if(cordinates[i].img.name === "kanyar"){
        switch (cordinates[i].img.rotate ) {
            case 0:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.jobbra = true
                let elsoImg = new Image();
                elsoImg.addEventListener('load', function () {
                    ctx.drawImage(elsoImg, cordinates[i].x, cordinates[i].y);
                }, false);
                elsoImg.src = 'kepek/utak/kanyarok/kanyar_0.png';
                break;
            case 90:
                cordinates[i].img.exits.jobbra = true
                cordinates[i].img.exits.le = true
                const masodikImg = new Image();
                masodikImg.addEventListener('load', function () {
                    ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
                }, false);

                masodikImg.src = 'kepek/utak/kanyarok/kanyar_90.png';
                break;
            case 180:
                cordinates[i].img.exits.balra = true
                cordinates[i].img.exits.le = true
                const harmadikImg = new Image();
                harmadikImg.addEventListener('load', function () {
                    ctx.drawImage(harmadikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                harmadikImg.src = 'kepek/utak/kanyarok/kanyar_180.png';
                break;
            case 270:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.balra = true
                let negyedikImg = new Image();
                negyedikImg.addEventListener('load', function () {
                    ctx.drawImage(negyedikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                negyedikImg.src = 'kepek/utak/kanyarok/kanyar_270.png';
                break;
        }
    }if(cordinates[i].img.name === "elagazas") {
        switch (cordinates[i].img.rotate) {
            case 0:
                cordinates[i].img.exits.balra = true
                cordinates[i].img.exits.jobbra = true
                cordinates[i].img.exits.le = true
                let elsoImg = new Image();
                elsoImg.addEventListener('load', function () {
                    ctx.drawImage(elsoImg, cordinates[i].x, cordinates[i].y);
                }, false);
                elsoImg.src = 'kepek/utak/elagazasok/elagazas_0.png';
                break;
            case 90:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.le = true
                cordinates[i].img.exits.balra = true
                const masodikImg = new Image();
                masodikImg.addEventListener('load', function () {
                    ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
                }, false);

                masodikImg.src = 'kepek/utak/elagazasok/elagazas_90.png';
                break;
            case 180:
                cordinates[i].img.exits.balra = true
                cordinates[i].img.exits.jobbra = true
                cordinates[i].img.exits.fel = true
                const harmadikImg = new Image();
                harmadikImg.addEventListener('load', function () {
                    ctx.drawImage(harmadikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                harmadikImg.src = 'kepek/utak/elagazasok/elagazas_180.png';
                break;
            case 270:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.le = true
                cordinates[i].img.exits.jobbra = true
                let negyedikImg = new Image();
                negyedikImg.addEventListener('load', function () {
                    ctx.drawImage(negyedikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                negyedikImg.src = 'kepek/utak/elagazasok/elagazas_270.png';
                break;
        }
    }
}
function kimaradtBeallitas() {
    ctx.beginPath();
    tomb = randomImg()
    kimaradt.img.name = tomb.name
    kimaradt.img.rotate = tomb.rotate
    if(kimaradt.img.name === "egyenes") {
        switch (kimaradt.img.rotate) {
            case 0:
                kimaradt.img.exits.balra = true
                kimaradt.img.exits.jobbra = true
                let elsoImg = new Image();
                elsoImg.addEventListener('load', function () {
                    ctxKep.drawImage(elsoImg, 0, 0);
                }, false);
                elsoImg.src = 'kepek/utak/egyenesek/egyenes_0.png';
                break;
            case 90:
                kimaradt.img.exits.fel = true
                kimaradt.img.exits.le = true
                const masodikImg = new Image();
                masodikImg.addEventListener('load', function () {
                    ctxKep.drawImage(masodikImg, 0, 0);
                }, false);

                masodikImg.src = 'kepek/utak/egyenesek/egyenes_1.png';
                break;
            case 180:
                kimaradt.img.exits.balra = true
                kimaradt.img.exits.jobbra = true
                const harmadikImg = new Image();
                harmadikImg.addEventListener('load', function () {
                    ctxKep.drawImage(harmadikImg, 0, 0);
                }, false);
                harmadikImg.src = 'kepek/utak/egyenesek/egyenes_0.png';
                break;
            case 270:
                kimaradt.img.exits.fel = true
                kimaradt.img.exits.le = true
                let negyedikImg = new Image();
                negyedikImg.addEventListener('load', function () {
                    ctxKep.drawImage(negyedikImg, 0, 0);
                }, false);
                negyedikImg.src = 'kepek/utak/egyenesek/egyenes_1.png';
                break;
        }
    }if(kimaradt.img.name === "kanyar"){
        switch (kimaradt.img.rotate ) {
            case 0:
                kimaradt.img.exits.balra = true
                kimaradt.img.exits.jobbra = true
                let elsoImg = new Image();
                elsoImg.addEventListener('load', function () {
                    ctxKep.drawImage(elsoImg, 0, 0);
                }, false);
                elsoImg.src = 'kepek/utak/kanyarok/kanyar_0.png';
                break;
            case 90:
                kimaradt.img.exits.fel = true
                kimaradt.img.exits.le = true
                const masodikImg = new Image();
                masodikImg.addEventListener('load', function () {
                    ctxKep.drawImage(masodikImg, 0, 0);
                }, false);

                masodikImg.src = 'kepek/utak/kanyarok/kanyar_90.png';
                break;
            case 180:
                kimaradt.img.exits.balra = true
                kimaradt.img.exits.jobbra = true
                const harmadikImg = new Image();
                harmadikImg.addEventListener('load', function () {
                    ctxKep.drawImage(harmadikImg, 0, 0);
                }, false);
                harmadikImg.src = 'kepek/utak/kanyarok/kanyar_180.png';
                break;
            case 270:
                kimaradt.img.exits.fel = true
                kimaradt.img.exits.le = true
                let negyedikImg = new Image();
                negyedikImg.addEventListener('load', function () {
                    ctxKep.drawImage(negyedikImg, 0, 0);
                }, false);
                negyedikImg.src = 'kepek/utak/kanyarok/kanyar_270.png';
                break;
        }
    }if(kimaradt.img.name === "elagazas") {
        switch (kimaradt.img.rotate) {
            case 0:
                kimaradt.img.exits.balra = true
                kimaradt.img.exits.jobbra = true
                let elsoImg = new Image();
                elsoImg.addEventListener('load', function () {
                    ctxKep.drawImage(elsoImg, 0, 0);
                }, false);
                elsoImg.src = 'kepek/utak/elagazasok/elagazas_0.png';
                break;
            case 90:
                kimaradt.img.exits.fel = true
                kimaradt.img.exits.le = true
                const masodikImg = new Image();
                masodikImg.addEventListener('load', function () {
                    ctxKep.drawImage(masodikImg, 0, 0);
                }, false);

                masodikImg.src = 'kepek/utak/elagazasok/elagazas_90.png';
                break;
            case 180:
                kimaradt.img.exits.balra = true
                kimaradt.img.exits.jobbra = true
                const harmadikImg = new Image();
                harmadikImg.addEventListener('load', function () {
                    ctxKep.drawImage(harmadikImg, 0, 0);
                }, false);
                harmadikImg.src = 'kepek/utak/elagazasok/elagazas_180.png';
                break;
            case 270:
                kimaradt.img.exits.fel = true
                kimaradt.img.exits.le = true
                let negyedikImg = new Image();
                negyedikImg.addEventListener('load', function () {
                    ctxKep.drawImage(negyedikImg, 0, 0);
                }, false);
                negyedikImg.src = 'kepek/utak/elagazasok/elagazas_270.png';
                break;
        }
    }
}
function beallitas(i) {
    if(cordinates[i].img.name === "egyenes") {
        switch (cordinates[i].img.rotate) {
            case 0:
                cordinates[i].img.exits.balra = true
                cordinates[i].img.exits.jobbra = true
                let elsoImg = new Image();
                elsoImg.addEventListener('load', function () {
                    ctx.drawImage(elsoImg, cordinates[i].x, cordinates[i].y);
                }, false);
                elsoImg.src = 'kepek/utak/egyenesek/egyenes_0.png';
                break;
            case 90:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.le = true
                const masodikImg = new Image();
                masodikImg.addEventListener('load', function () {
                    ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
                }, false);

                masodikImg.src = 'kepek/utak/egyenesek/egyenes_1.png';
                break;
            case 180:
                cordinates[i].img.exits.balra = true
                cordinates[i].img.exits.jobbra = true
                const harmadikImg = new Image();
                harmadikImg.addEventListener('load', function () {
                    ctx.drawImage(harmadikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                harmadikImg.src = 'kepek/utak/egyenesek/egyenes_0.png';
                break;
            case 270:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.le = true
                let negyedikImg = new Image();
                negyedikImg.addEventListener('load', function () {
                    ctx.drawImage(negyedikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                negyedikImg.src = 'kepek/utak/egyenesek/egyenes_1.png';
                break;
        }
    }if(cordinates[i].img.name === "kanyar"){
        switch (cordinates[i].img.rotate ) {
            case 0:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.jobbra = true
                let elsoImg = new Image();
                elsoImg.addEventListener('load', function () {
                    ctx.drawImage(elsoImg, cordinates[i].x, cordinates[i].y);
                }, false);
                elsoImg.src = 'kepek/utak/kanyarok/kanyar_0.png';
                break;
            case 90:
                cordinates[i].img.exits.jobbra = true
                cordinates[i].img.exits.le = true
                const masodikImg = new Image();
                masodikImg.addEventListener('load', function () {
                    ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
                }, false);

                masodikImg.src = 'kepek/utak/kanyarok/kanyar_90.png';
                break;
            case 180:
                cordinates[i].img.exits.balra = true
                cordinates[i].img.exits.le = true
                const harmadikImg = new Image();
                harmadikImg.addEventListener('load', function () {
                    ctx.drawImage(harmadikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                harmadikImg.src = 'kepek/utak/kanyarok/kanyar_180.png';
                break;
            case 270:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.balra = true
                let negyedikImg = new Image();
                negyedikImg.addEventListener('load', function () {
                    ctx.drawImage(negyedikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                negyedikImg.src = 'kepek/utak/kanyarok/kanyar_270.png';
                break;
        }
    }if(cordinates[i].img.name === "elagazas") {
        switch (cordinates[i].img.rotate) {
            case 0:
                cordinates[i].img.exits.balra = true
                cordinates[i].img.exits.jobbra = true
                cordinates[i].img.exits.le = true
                let elsoImg = new Image();
                elsoImg.addEventListener('load', function () {
                    ctx.drawImage(elsoImg, cordinates[i].x, cordinates[i].y);
                }, false);
                elsoImg.src = 'kepek/utak/elagazasok/elagazas_0.png';
                break;
            case 90:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.le = true
                cordinates[i].img.exits.balra = true
                const masodikImg = new Image();
                masodikImg.addEventListener('load', function () {
                    ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
                }, false);

                masodikImg.src = 'kepek/utak/elagazasok/elagazas_90.png';
                break;
            case 180:
                cordinates[i].img.exits.balra = true
                cordinates[i].img.exits.jobbra = true
                cordinates[i].img.exits.fel = true
                const harmadikImg = new Image();
                harmadikImg.addEventListener('load', function () {
                    ctx.drawImage(harmadikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                harmadikImg.src = 'kepek/utak/elagazasok/elagazas_180.png';
                break;
            case 270:
                cordinates[i].img.exits.fel = true
                cordinates[i].img.exits.le = true
                cordinates[i].img.exits.jobbra = true
                let negyedikImg = new Image();
                negyedikImg.addEventListener('load', function () {
                    ctx.drawImage(negyedikImg, cordinates[i].x, cordinates[i].y);
                }, false);
                negyedikImg.src = 'kepek/utak/elagazasok/elagazas_270.png';
                break;
        }
    }

}
function fixPozBeallitas(i) {
    if(i===12 || i === 14){
        cordinates[i].img.exits.fel = true
        cordinates[i].img.exits.jobbra = true
        cordinates[i].img.exits.le = true
        let negyedikImg = new Image();
        negyedikImg.addEventListener('load', function () {
            ctx.drawImage(negyedikImg, cordinates[i].x, cordinates[i].y);
        }, false);
        negyedikImg.src = 'kepek/utak/elagazasok/elagazas_270.png';
        cordinates[i].img.name = negyedikImg.src
    }if(i===10){
        cordinates[i].img.exits.jobbra = true
        cordinates[i].img.exits.le = true
        const masodikImg = new Image();
        masodikImg.addEventListener('load', function () {
            ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
        }, false);

        masodikImg.src = 'kepek/utak/kanyarok/kanyar_90.png';
        cordinates[i].img.name = masodikImg.src
    }if(i===16){
        cordinates[i].img.exits.fel = true
        cordinates[i].img.exits.jobbra = true
        const masodikImg = new Image();
        masodikImg.addEventListener('load', function () {
            ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
        }, false);

        masodikImg.src = 'kepek/utak/kanyarok/kanyar_0.png';
        cordinates[i].img.name = masodikImg.src
    }if(i===28 || i===46){
        cordinates[i].img.exits.balra = true
        cordinates[i].img.exits.jobbra = true
        cordinates[i].img.exits.le = true
        let negyedikImg = new Image();
        negyedikImg.addEventListener('load', function () {
            ctx.drawImage(negyedikImg, cordinates[i].x, cordinates[i].y);
        }, false);
        negyedikImg.src = 'kepek/utak/elagazasok/elagazas_0.png';
        cordinates[i].img.name = negyedikImg.src

    }if(i===64){
        cordinates[i].img.exits.balra = true
        cordinates[i].img.exits.le = true
        const masodikImg = new Image();
        masodikImg.addEventListener('load', function () {
            ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
        }, false);
        masodikImg.src = 'kepek/utak/kanyarok/kanyar_180.png';
        cordinates[i].img.name = masodikImg.src
    }if(i===34 || i===52){
        cordinates[i].img.exits.jobbra = true
        cordinates[i].img.exits.balra = true
        cordinates[i].img.exits.fel = true
        const masodikImg = new Image();
        masodikImg.addEventListener('load', function () {
            ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
        }, false);
        masodikImg.src = 'kepek/utak/elagazasok/elagazas_180.png';
        cordinates[i].img.name = masodikImg.src
    }if(i===66 || i===68){
        cordinates[i].img.exits.fel = true
        cordinates[i].img.exits.le = true
        cordinates[i].img.exits.balra = true
        const masodikImg = new Image();
        masodikImg.addEventListener('load', function () {
            ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
        }, false);
        masodikImg.src = 'kepek/utak/elagazasok/elagazas_90.png';
        cordinates[i].img.name = masodikImg.src
    }if(i===70){
        cordinates[i].img.exits.balra = true
        cordinates[i].img.exits.fel = true
        const masodikImg = new Image();
        masodikImg.addEventListener('load', function () {
            ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
        }, false);
        masodikImg.src = 'kepek/utak/kanyarok/kanyar_270.png';
        cordinates[i].img.name = masodikImg.src
    }if(i===30){
        cordinates[i].img.exits.fel = true
        cordinates[i].img.exits.le = true
        cordinates[i].img.exits.jobbra = true
        const masodikImg = new Image();
        masodikImg.addEventListener('load', function () {
            ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
        }, false);
        masodikImg.src = 'kepek/utak/elagazasok/elagazas_270.png';
        cordinates[i].img.name = masodikImg.src
    }if(i===48){
        cordinates[i].img.exits.jobbra = true
        cordinates[i].img.exits.balra = true
        cordinates[i].img.exits.le = true
        const masodikImg = new Image();
        masodikImg.addEventListener('load', function () {
            ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
        }, false);
        masodikImg.src = 'kepek/utak/elagazasok/elagazas_0.png';
        cordinates[i].img.name = masodikImg.src
    }if(i===50){
        cordinates[i].img.exits.fel = true
        cordinates[i].img.exits.le = true
        cordinates[i].img.exits.balra = true
        const masodikImg = new Image();
        masodikImg.addEventListener('load', function () {
            ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
        }, false);
        masodikImg.src = 'kepek/utak/elagazasok/elagazas_90.png';
        cordinates[i].img.name = masodikImg.src
    }if(i===32){
        cordinates[i].img.exits.balra = true
        cordinates[i].img.exits.jobbra = true
        cordinates[i].img.exits.fel = true
        const masodikImg = new Image();
        masodikImg.addEventListener('load', function () {
            ctx.drawImage(masodikImg, cordinates[i].x, cordinates[i].y);
        }, false);
        masodikImg.src = 'kepek/utak/elagazasok/elagazas_180.png';
        cordinates[i].img.name = masodikImg.src
    }
}
function createCanvas() {
    keret.push(0,1,3,5,7,8,9,17,35,27,45,53,71,63,72,73,74,75,76,77,78,79,80)
    jobbra.push(2,4,6)
    lefele.push(18,36,54)
    felfele.push(26,44,62)
    balra.push(74,76,78)
    console.log(balra)

    for (let i = 0; i < 549; i+=61) {
        for (let j = 0; j < 549; j+=61) {
            cordinates.push({
                    x: i,
                    y: j,
                    w: 61,
                    h: 61,
                    img: {
                        name: "valami",
                        exits: {
                            fel: false,
                            le: false,
                            balra: false,
                            jobbra: false
                        },
                        rotate: 0
                    }
            })
        }
    }
    for (let i = 0; i <81; i++) {
        if (jobbra.includes(i)) {
            ctx.drawImage(jobbraNyil, cordinates[i].x, cordinates[i].y);
            cordinates[i].name = jobbraNyil.src
        }else if (balra.includes(i)){
            ctx.drawImage(balraNyil, cordinates[i].x, cordinates[i].y);
            cordinates[i].name = balraNyil.src
        }else if(felfele.includes(i)){
            ctx.drawImage(felfeleNyil, cordinates[i].x, cordinates[i].y);
            cordinates[i].name = felfeleNyil.src
        }else if(lefele.includes(i)){
            ctx.drawImage(lefeleNyil, cordinates[i].x, cordinates[i].y);
            cordinates[i].name = lefeleNyil.src
        }else if(keret.includes(i)){
            ctx.beginPath();
            ctx.fillStyle = '#4d3227';
            ctx.fillRect(cordinates[i].x, cordinates[i].y, cordinates[i].w, cordinates[i].h);
            ctx.stroke();
        }else if(fixPoziciok.includes(i)) {
            fixPozBeallitas(i)
        }if(!fixPoziciok.includes(i) && !jobbra.includes(i) && !balra.includes(i) && !felfele.includes(i) && !lefele.includes(i) && !keret.includes(i)){
            kezdoBeallitas(i)
        }
    }
    kimaradtBeallitas()

}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    let i = tablaelemKereses(x,y)
    return i;
}
function betoltes() {
    for (let i = 0; i < 81; i++) {
        if (jobbra.includes(i)) {
            ctx.drawImage(jobbraNyil, cordinates[i].x, cordinates[i].y);
            cordinates[i].name = jobbraNyil.src
        }else if (balra.includes(i)){
            ctx.drawImage(balraNyil, cordinates[i].x, cordinates[i].y);
            cordinates[i].name = balraNyil.src
        }else if(felfele.includes(i)){
            ctx.drawImage(felfeleNyil, cordinates[i].x, cordinates[i].y);
            cordinates[i].name = felfeleNyil.src
        }else if(lefele.includes(i)){
            ctx.drawImage(lefeleNyil, cordinates[i].x, cordinates[i].y);
            cordinates[i].name = lefeleNyil.src
        }else if(keret.includes(i)){
            ctx.beginPath();
            ctx.fillStyle = '#4d3227';
            ctx.fillRect(cordinates[i].x, cordinates[i].y, cordinates[i].w, cordinates[i].h);
            ctx.stroke();
        }else if(fixPoziciok.includes(i)) {
            fixPozBeallitas(i)
        }else{
            beallitas(i)
            if(kimaradt.img.name === "egyenes") {
                switch (kimaradt.img.rotate) {
                    case 0:
                        kimaradt.img.exits.balra = true
                        kimaradt.img.exits.jobbra = true
                        let elsoImg = new Image();
                        elsoImg.addEventListener('load', function () {
                            ctxKep.drawImage(elsoImg, 0, 0);
                        }, false);
                        elsoImg.src = 'kepek/utak/egyenesek/egyenes_0.png';
                        break;
                    case 90:
                        kimaradt.img.exits.fel = true
                        kimaradt.img.exits.le = true
                        const masodikImg = new Image();
                        masodikImg.addEventListener('load', function () {
                            ctxKep.drawImage(masodikImg, 0, 0);
                        }, false);

                        masodikImg.src = 'kepek/utak/egyenesek/egyenes_1.png';
                        break;
                    case 180:
                        kimaradt.img.exits.balra = true
                        kimaradt.img.exits.jobbra = true
                        const harmadikImg = new Image();
                        harmadikImg.addEventListener('load', function () {
                            ctxKep.drawImage(harmadikImg, 0, 0);
                        }, false);
                        harmadikImg.src = 'kepek/utak/egyenesek/egyenes_0.png';
                        break;
                    case 270:
                        kimaradt.img.exits.fel = true
                        kimaradt.img.exits.le = true
                        let negyedikImg = new Image();
                        negyedikImg.addEventListener('load', function () {
                            ctxKep.drawImage(negyedikImg, 0, 0);
                        }, false);
                        negyedikImg.src = 'kepek/utak/egyenesek/egyenes_1.png';
                        break;
                }
            }if(kimaradt.img.name === "kanyar"){
                switch (kimaradt.img.rotate ) {
                    case 0:
                        kimaradt.img.exits.fel = true
                        kimaradt.img.exits.jobbra = true
                        let elsoImg = new Image();
                        elsoImg.addEventListener('load', function () {
                            ctxKep.drawImage(elsoImg, 0, 0);
                        }, false);
                        elsoImg.src = 'kepek/utak/kanyarok/kanyar_0.png';
                        break;
                    case 90:
                        kimaradt.img.exits.jobbra = true
                        kimaradt.img.exits.le = true
                        const masodikImg = new Image();
                        masodikImg.addEventListener('load', function () {
                            ctxKep.drawImage(masodikImg, 0, 0);
                        }, false);

                        masodikImg.src = 'kepek/utak/kanyarok/kanyar_90.png';
                        break;
                    case 180:
                        kimaradt.img.exits.balra = true
                        kimaradt.img.exits.le = true
                        const harmadikImg = new Image();
                        harmadikImg.addEventListener('load', function () {
                            ctxKep.drawImage(harmadikImg, 0, 0);
                        }, false);
                        harmadikImg.src = 'kepek/utak/kanyarok/kanyar_180.png';
                        break;
                    case 270:
                        kimaradt.img.exits.fel = true
                        kimaradt.img.exits.balra = true
                        let negyedikImg = new Image();
                        negyedikImg.addEventListener('load', function () {
                            ctxKep.drawImage(negyedikImg, 0, 0);
                        }, false);
                        negyedikImg.src = 'kepek/utak/kanyarok/kanyar_270.png';
                        break;
                }
            }if(kimaradt.img.name === "elagazas") {
                switch (kimaradt.img.rotate) {
                    case 0:
                        kimaradt.img.exits.balra = true
                        kimaradt.img.exits.jobbra = true
                        kimaradt.img.exits.le = true
                        let elsoImg = new Image();
                        elsoImg.addEventListener('load', function () {
                            ctxKep.drawImage(elsoImg, 0, 0);
                        }, false);
                        elsoImg.src = 'kepek/utak/elagazasok/elagazas_0.png';
                        break;
                    case 90:
                        kimaradt.img.exits.fel = true
                        kimaradt.img.exits.le = true
                        kimaradt.img.exits.balra = true
                        const masodikImg = new Image();
                        masodikImg.addEventListener('load', function () {
                            ctxKep.drawImage(masodikImg, 0, 0);
                        }, false);

                        masodikImg.src = 'kepek/utak/elagazasok/elagazas_90.png';
                        break;
                    case 180:
                        kimaradt.img.exits.balra = true
                        kimaradt.img.exits.jobbra = true
                        kimaradt.img.exits.fel = true
                        const harmadikImg = new Image();
                        harmadikImg.addEventListener('load', function () {
                            ctxKep.drawImage(harmadikImg, 0, 0);
                        }, false);
                        harmadikImg.src = 'kepek/utak/elagazasok/elagazas_180.png';
                        break;
                    case 270:
                        kimaradt.img.exits.fel = true
                        kimaradt.img.exits.le = true
                        kimaradt.img.exits.jobbra = true
                        let negyedikImg = new Image();
                        negyedikImg.addEventListener('load', function () {
                            ctxKep.drawImage(negyedikImg, 0, 0);
                        }, false);
                        negyedikImg.src = 'kepek/utak/elagazasok/elagazas_270.png';
                        break;
                }
            }
        }

    }
}
function randomImg(){
    if(counter[0]===13 && src.includes("egyenes")){
        countIdx = src.indexOf("egyenes")
        src.splice(countIdx,1)
    }else if(counter[1]=== 15 && src.includes("kanyar")){
        countIdx = src.indexOf("kanyar")
        src.splice(countIdx,1)
    }else if(counter[2]===6 && src.includes("elagazas")){
        countIdx = src.indexOf("elagazas")
        src.splice(countIdx,1)
    }

    elsoRandom = Math.floor(Math.random() * src.length);
    counter[elsoRandom]++
    masodikRandom = Math.floor(Math.random() * 4);

    let tomb = {
        name: src[elsoRandom],
        rotate: rotate[masodikRandom]
    }
    return tomb;
}

function lefeleCsere(startPosition) {
    before = cordinates[startPosition].img
    cordinates[startPosition].img = kimaradt.img
    for (let i = startPosition+1; i < startPosition+7; i++) {
        if(i === startPosition+6){
            current = cordinates[i].img
            cordinates[i].img = before
            kimaradt.img = current
        }else{
            current = cordinates[i].img
            cordinates[i].img = before
            before = current
        }
    }
}
function jobbraCsere(startPosition){
    before = cordinates[startPosition].img
    console.log(before)
    console.log(kimaradt)
    cordinates[startPosition].img = kimaradt.img
    let current;
    for (let i = startPosition + 9; i < startPosition + (9 * 7); i=i+9) {
        if (i === startPosition + (9 * 6)) {
            current = cordinates[i].img
            cordinates[i].img = before
            kimaradt.img = current
        } else {
            current = cordinates[i].img
            cordinates[i].img = before
            before = current
        }
    }
}
function balraCsere(startPosition){
    before = cordinates[startPosition].img
    console.log(before)
    console.log(kimaradt)
    cordinates[startPosition].img = kimaradt.img
    let current;
    for (let i = startPosition - 9; i > startPosition%9; i=i-9) {
        if (i === startPosition%9 + 9) {
            current = cordinates[i].img
            cordinates[i].img = before
            kimaradt.img = current
        } else {
            current = cordinates[i].img
            cordinates[i].img = before
            before = current
        }
    }
}
function felfeleCsere(startPosition){
    before = cordinates[startPosition].img
    console.log(before)
    console.log(kimaradt)
    cordinates[startPosition].img = kimaradt.img
    for (let i = startPosition-1; i > startPosition-7; i--) {
        if(i === startPosition-6){
            current = cordinates[i].img
            cordinates[i].img = before
            kimaradt.img = current
        }else{
            current = cordinates[i].img
            cordinates[i].img = before
            before = current
        }
    }
}

function lefeleMozgatas(startPosition) {
        lefeleCsere(startPosition+1)
        betoltes()
        mozgatott= true
}
function balraMozgatas(startPosition) {
    balraCsere(startPosition-9)
    betoltes()
    mozgatott= true
}
function jobbraMozgatas(startPosition) {
    jobbraCsere(startPosition+9)
    betoltes()
    mozgatott= true
}
function felfeleMozgatas(startPosition) {
    felfeleCsere(startPosition-1)
    betoltes()
    mozgatott= true
}

function tablaelemKereses(x,y){
    for (let i = 0; i < cordinates.length; i++) {
        if(cordinates[i].x <= x && cordinates[i].x+61 > x && cordinates[i].y <= y && cordinates[i].y+61> y ){
            console.log(i)
            return i;
        }
    }

}
function generateGem(gemNumbers,playerNumber){
    pirosKincs.length = 0
    kekKincs.length = 0
    zoldKincs.length = 0
    citromKincs.length = 0
    switch (playerNumber){
        case 1:
            for (let j = 0; j < gemNumbers; j++) {
                i = Math.floor(Math.random() * 70) + 10;
                while (keret.includes(i) || lefele.includes(i) || balra.includes(i) || jobbra.includes(i)|| felfele.includes(i) || szelek.includes(i) || pirosKincs.includes(i)){
                    i = Math.floor(Math.random() * 70) + 10;
                }
                zoldKincs.push(i)
            }
            break;
        case 2:
            for (let j = 0; j < gemNumbers; j++) {
                i = Math.floor(Math.random() * 70) + 10;
                while (keret.includes(i) || lefele.includes(i) || balra.includes(i) || jobbra.includes(i)|| felfele.includes(i) || szelek.includes(i) || pirosKincs.includes(i)){                    i = Math.floor(Math.random() * 70) + 10;
                }
                zoldKincs.push(i)
            }
            for (let j = 0; j < gemNumbers; j++) {
                i = Math.floor(Math.random() * 70) + 10;
                while (zoldKincs.includes(i)|| keret.includes(i) || lefele.includes(i) || balra.includes(i) || jobbra.includes(i)|| felfele.includes(i) || szelek.includes(i) || pirosKincs.includes(i)){
                    i = Math.floor(Math.random() * 70) + 10;
                }
                pirosKincs.push(i)
            }
            break;
        case 3:
            for (let j = 0; j < gemNumbers; j++) {
                i = Math.floor(Math.random() * 70) + 10;
                while (keret.includes(i) || lefele.includes(i) || balra.includes(i) || jobbra.includes(i)|| felfele.includes(i) || szelek.includes(i) || pirosKincs.includes(i)){
                    i = Math.floor(Math.random() * 70) + 10;
                }
                zoldKincs.push(i)
            }
            for (let j = 0; j < gemNumbers; j++) {
                i = Math.floor(Math.random() * 70) + 10;
                while (zoldKincs.includes(i) || keret.includes(i) || lefele.includes(i) || balra.includes(i) || jobbra.includes(i)|| felfele.includes(i) || szelek.includes(i) || pirosKincs.includes(i)){
                    i = Math.floor(Math.random() * 70) + 10;
                }
                pirosKincs.push(i)
            }
            for (let j = 0; j < gemNumbers; j++) {
                i = Math.floor(Math.random() * 70) + 10;
                while (zoldKincs.includes(i) ||pirosKincs.includes(i) || keret.includes(i) || lefele.includes(i) || balra.includes(i) || jobbra.includes(i)|| felfele.includes(i) || szelek.includes(i) || pirosKincs.includes(i)){
                    i = Math.floor(Math.random() * 70) + 10;
                }
                kekKincs.push(i)
            }
            break;
        case 4:
            for (let j = 0; j < gemNumbers; j++) {
                i = Math.floor(Math.random() * 70) + 10;
                while (keret.includes(i) || lefele.includes(i) || balra.includes(i) || jobbra.includes(i)|| felfele.includes(i) || szelek.includes(i) || pirosKincs.includes(i)){
                    i = Math.floor(Math.random() * 70) + 10;
                }
                zoldKincs.push(i)
            }
            for (let j = 0; j < gemNumbers; j++) {
                i = Math.floor(Math.random() * 70) + 10;
                while (zoldKincs.includes(i)|| keret.includes(i) || lefele.includes(i) || balra.includes(i) || jobbra.includes(i)|| felfele.includes(i) || szelek.includes(i) || pirosKincs.includes(i)){
                    i = Math.floor(Math.random() * 70) + 10;
                }
                pirosKincs.push(i)
            }
            for (let j = 0; j < gemNumbers; j++) {
                i = Math.floor(Math.random() * 70) + 10;
                while (zoldKincs.includes(i)||pirosKincs.includes(i)||keret.includes(i) || lefele.includes(i) || balra.includes(i) || jobbra.includes(i)|| felfele.includes(i) || szelek.includes(i) || pirosKincs.includes(i)){
                    i = Math.floor(Math.random() * 70) + 10;
                }
                kekKincs.push(i)
            }
            for (let j = 0; j < gemNumbers; j++) {
                i = Math.floor(Math.random() * 70) + 10;
                while (zoldKincs.includes(i)||pirosKincs.includes(i)||kekKincs.includes(i)||keret.includes(i) || lefele.includes(i) || balra.includes(i) || jobbra.includes(i)|| felfele.includes(i) || szelek.includes(i) || pirosKincs.includes(i)){
                    i = Math.floor(Math.random() * 70) + 10;
                }
                citromKincs.push(i)
            }


    }
    console.log(pirosKincs)
    console.log(kekKincs)
    console.log(citromKincs)
    console.log(zoldKincs)

}
function drawGem(){
    for (let i = 0; i <players.length; i++) {
        if(players[i].playing){
            console.log(players[i])
            switch (players[i].color){
                case "Zold":
                    if(players[i].Treasure === zoldKincs.length){

                    }else{
                        szam = zoldKincs[players[i].Treasure]
                        console.log(szam)
                        let elsoImg = new Image();
                        elsoImg.addEventListener('load', function () {
                            playerCtx.drawImage(elsoImg, cordinates[szam].x, cordinates[szam].y);
                        }, false);
                        elsoImg.src = 'kepek/zoldGem.png';
                    }
                    break;
                case "Piros":
                    console.log("piros")
                    if(players[i].Treasure === pirosKincs.length){
                        console.log("piros")
                    }else{
                        szam = pirosKincs[players[i].Treasure]
                        console.log(szam)
                        let elsoImg = new Image();
                        elsoImg.addEventListener('load', function () {
                            playerCtx.drawImage(elsoImg, cordinates[szam].x, cordinates[szam].y);
                        }, false);
                        elsoImg.src = 'kepek/pirosGem.png';
                    }
                    break;
                case "Citrom":
                    if(players[i].Treasure === citromKincs.length){

                    }else{
                        szam = citromKincs[players[i].Treasure]
                        console.log(szam)
                        let elsoImg = new Image();
                        elsoImg.addEventListener('load', function () {
                            playerCtx.drawImage(elsoImg, cordinates[szam].x, cordinates[szam].y);
                        }, false);
                        elsoImg.src = 'kepek/sargaGem.png';
                    }
                    break;
                case "Kek":
                    if(players[i].Treasure === kekKincs.length){

                    }else{
                        szam = kekKincs[players[i].Treasure]
                        console.log(szam)
                        let elsoImg = new Image();
                        elsoImg.addEventListener('load', function () {
                            playerCtx.drawImage(elsoImg, cordinates[szam].x, cordinates[szam].y);
                        }, false);
                        elsoImg.src = 'kepek/gemGame.png';
                    }
                    break;
            }
            break
        }
    }
}
function kezdes() {
    cordinates.length = 0
    selected = document.querySelector("#playerNumber").value
    kincsSzam = document.querySelector("#kincsSzam").value
    console.log(selected)
    counter = [0,0,0]
    rotate = [0,90,180,270]
    src = []
    src.push("egyenes", "kanyar", "elagazas")
    createCanvas()
    document.querySelector("#kezdes").style.display = "block";
    players.length = 0
    switch (parseInt(selected)){
        case 1:
            players.push({
                color: "Zold",
                tableElement: 10,
                startingPoint: 10,
                Treasure: 0,
                playing: true
            });
            break;
        case 2:
            players.push({
                color: "Zold",
                tableElement: 10,
                startingPoint: 10,
                Treasure: 0,
                playing: true
            });
            players.push({
                color: "Piros",
                tableElement: 64,
                startingPoint: 64,
                Treasure: 0,
                playing: false
            });
            break;
        case 3:
            players.push({
                color: "Zold",
                tableElement: 10,
                startingPoint: 10,
                Treasure: 0,
                playing: true
            });
            players.push({
                color: "Piros",
                tableElement: 64,
                startingPoint: 64,
                Treasure: 0,
                playing: false
            });
            players.push({
                color: "Kek",
                tableElement: 16,
                startingPoint: 16,
                Treasure: 0,
                playing: false
            });
            break;
        case 4:
            players.push({
                color: "Zold",
                tableElement: 10,
                startingPoint: 10,
                Treasure: 0,
                playing: true
            });
            players.push({
                color: "Piros",
                tableElement: 64,
                startingPoint: 64,
                Treasure: 0,
                playing: false
            });
            players.push({
                color: "Kek",
                tableElement: 16,
                startingPoint: 16,
                Treasure: 0,
                playing: false
            });
            players.push({
                color: "Citrom",
                tableElement: 70,
                startingPoint: 70,
                Treasure: 0,
                playing: false
            });

    }
    console.log(players)
    drawPlayers(selected)
    generateGem(kincsSzam,parseInt(selected))
    drawGem()
    currPlayer()
}
function drawPlayers(playerNumber) {
    console.log(playerNumber)
    playerNumberInt = parseInt(playerNumber)
    playerCtx.clearRect(0,0,549,549)
    switch (playerNumberInt){
        case 1:
            let elsoImg = new Image();
            elsoImg.addEventListener('load', function () {
                playerCtx.drawImage(elsoImg, cordinates[players[0].tableElement].x, cordinates[players[0].tableElement].y);
            }, false);
            elsoImg.src = 'kepek/babuk/zoldBabu61.png';
            break;
        case 2:
            let valami = new Image();
            valami.addEventListener('load', function () {
                playerCtx.drawImage(valami, cordinates[players[0].tableElement].x, cordinates[players[0].tableElement].y);
            }, false);
            valami.src = 'kepek/babuk/zoldBabu61.png';
            let valami1 = new Image();
            valami1.addEventListener('load', function () {
                playerCtx.drawImage(valami1, cordinates[players[1].tableElement].x, cordinates[players[1].tableElement].y);
            }, false);
            valami1.src = 'kepek/babuk/pirosBabu61.png';
            break;
        case 3:
            let valami2 = new Image();
            valami2.addEventListener('load', function () {
                playerCtx.drawImage(valami2, cordinates[players[0].tableElement].x, cordinates[players[0].tableElement].y);
            }, false);
            valami2.src = 'kepek/babuk/zoldBabu61.png';
            let valami3 = new Image();
            valami3.addEventListener('load', function () {
                playerCtx.drawImage(valami3, cordinates[players[1].tableElement].x, cordinates[players[1].tableElement].y);
            }, false);
            valami3.src = 'kepek/babuk/pirosBabu61.png';
            let valami4 = new Image();
            valami4.addEventListener('load', function () {
                playerCtx.drawImage(valami4, cordinates[players[2].tableElement].x, cordinates[players[2].tableElement].y);
            }, false);
            valami4.src = 'kepek/babuk/kekBabu61.png';
            break;
        case 4:
            let valami5 = new Image();
            valami5.addEventListener('load', function () {
                playerCtx.drawImage(valami5, cordinates[players[0].tableElement].x, cordinates[players[0].tableElement].y);
            }, false);
            valami5.src = 'kepek/babuk/zoldBabu61.png';
            let valami6 = new Image();
            valami6.addEventListener('load', function () {
                playerCtx.drawImage(valami6, cordinates[players[1].tableElement].x, cordinates[players[1].tableElement].y);
            }, false);
            valami6.src = 'kepek/babuk/pirosBabu61.png';
            let valami7 = new Image();
            valami7.addEventListener('load', function () {
                playerCtx.drawImage(valami7, cordinates[players[2].tableElement].x, cordinates[players[2].tableElement].y);
            }, false);
            valami7.src = 'kepek/babuk/kekBabu61.png';
            let valami8 = new Image();
            valami8.addEventListener('load', function () {
                playerCtx.drawImage(valami8, cordinates[players[3].tableElement].x, cordinates[players[3].tableElement].y);
            }, false);
            valami8.src = 'kepek/babuk/citromBabu61.png';
            break;
    }

}
function currPlayer(){
    kincsSzam = document.querySelector("#kincsSzam").value
    label = document.querySelector("#currentPlayer")
    for (const playersKey of players) {
        if(playersKey.playing){
            label.innerHTML = `Jelenleg a ${playersKey.color} jatekos jatszik! Hatralevo kincseknek a szama: ${parseInt(kincsSzam)-parseInt(playersKey.Treasure)} `
        }
    }
}
function vizsgalat(tableElement, position) {
    console.log(cordinates[tableElement].img)
    console.log(cordinates[position].img)
    igaz = false
    if(position === tableElement+1 && cordinates[tableElement].img.exits.le && cordinates[position].img.exits.fel){
        igaz = true;
        console.log(igaz)
    }else if(position === tableElement-1 && cordinates[tableElement].img.exits.fel && cordinates[position].img.exits.le){
        igaz =  true;
        console.log(igaz)
    }else if(position === tableElement+9 && cordinates[tableElement].img.exits.jobbra && cordinates[position].img.exits.balra){
        igaz = true;
        console.log(igaz)
    }else igaz = !!(position === tableElement - 9 && cordinates[tableElement].img.exits.balra && cordinates[position].img.exits.jobbra);
    console.log(igaz)
    return igaz;
}
function valtas(){
    selected = document.querySelector("#playerNumber").value
    if(players.length === 1){
        mozgatott = false
    }else{
        for (i=0;i<players.length;i++) {
            if(players[i].playing && i === players.length-1){
                console.log(players[i])
                players[0].playing = true
                players[i].playing = false
                mozgatott = false
                currPlayer()
                drawPlayers(selected)
                drawGem()
                break
            }else if(players[i].playing){

                players[i+1].playing = true
                players[i].playing = false
                console.log(players[i+1])
                console.log(players[i])
                mozgatott = false
                currPlayer()
                drawPlayers(selected)
                drawGem()
                break
            }
        }
    }

}
function end(szin) {
    window.confirm(`A jatek vegetert a ${szin} szinu jatekos nyert`);
    if (confirm("Szeretned ujrakezdeni a jatekot?")) {
        window.location.reload()
    } else {
        txt = "You pressed Cancel!";
    }
}
function lepes(position) {
    if(mozgatott){
        for (let i = 0; i <players.length; i++) {
            if(players[i].playing){
                console.log(players[i])
                if(players[i].color === "Zold"){
                    igaz = vizsgalat(players[i].tableElement,position)
                    if(igaz){
                        if(position === zoldKincs[players[i].Treasure]){
                            players[i].tableElement = position
                            console.log( players[i].tableElement)
                            players[i].Treasure++
                            drawPlayers(selected)
                            drawGem()
                            currPlayer()
                        }if(position === players[i].startingPoint && players[i].Treasure === zoldKincs.length){
                            players[i].tableElement = position
                            console.log( players[i].tableElement)
                            drawPlayers(selected)
                            drawGem()
                            currPlayer()
                            end(players[i].color)
                        }
                        players[i].tableElement = position
                        console.log( players[i].tableElement)
                        drawPlayers(selected)
                        drawGem()
                        currPlayer()
                    }
                }else if(players[i].color === "Piros"){

                    igaz = vizsgalat(players[i].tableElement,position)
                    if(igaz){
                        if(position === pirosKincs[players[i].Treasure]){
                            players[i].tableElement = position
                            console.log( players[i].tableElement)
                            players[i].Treasure++
                            drawPlayers(selected)
                            drawGem()
                            currPlayer()
                        }if(position === players[i].startingPoint && players[i].Treasure === pirosKincs.length){
                            players[i].tableElement = position
                            console.log( players[i].tableElement)
                            drawPlayers(selected)
                            drawGem()
                            currPlayer()
                            end(players[i].color)
                        }
                        players[i].tableElement = position
                        console.log( players[i].tableElement)
                        drawPlayers(selected)
                        drawGem()
                        currPlayer()
                    }
                }else if(players[i].color === "Citrom"){
                    igaz = vizsgalat(players[i].tableElement,position)
                    if(igaz){
                        if(position === citromKincs[players[i].Treasure]){
                            players[i].tableElement = position
                            console.log( players[i].tableElement)
                            players[i].Treasure++
                            drawPlayers(selected)
                            drawGem()
                            currPlayer()
                        }if(position === players[i].startingPoint && players[i].Treasure === citromKincs.length){
                            players[i].tableElement = position
                            console.log( players[i].tableElement)
                            drawPlayers(selected)
                            drawGem()
                            currPlayer()
                            end(players[i].color)
                        }
                        players[i].tableElement = position
                        console.log( players[i].tableElement)
                        drawPlayers(selected)
                        drawGem()
                        currPlayer()
                    }
                }else if(players[i].color === "Kek"){
                    igaz = vizsgalat(players[i].tableElement,position)
                    if(igaz){
                        if(position === kekKincs[players[i].Treasure]){
                            players[i].tableElement = position
                            console.log( players[i].tableElement)
                            players[i].Treasure++
                            drawPlayers(selected)
                            drawGem()
                            currPlayer()
                        }if(position === players[i].startingPoint && players[i].Treasure === kekKincs.length){
                            players[i].tableElement = position
                            console.log( players[i].tableElement)
                            drawPlayers(selected)
                            drawGem()
                            currPlayer()
                            end(players[i].color)
                        }
                        players[i].tableElement = position
                        console.log( players[i].tableElement)
                        drawPlayers(selected)
                        drawGem()
                        currPlayer()
                    }
                }

            }
        }
    }else{

    }

}

//Eventek

gameSubmitButton = document.querySelector("#submitButton")

playerCanvas.addEventListener('mousedown', function(e) {
    let position = getCursorPosition(c, e)
    if (!mozgatott) {
        if (lefele.includes(position)) {
            lefeleMozgatas(position)
        } else if (felfele.includes(position)) {
            felfeleMozgatas(position)
        } else if (balra.includes(position)) {
            balraMozgatas(position)
        } else if (jobbra.includes(position)) {
            jobbraMozgatas(position)
        }
    }else if(!lefele.includes(position) && !felfele.includes(position) && !balra.includes(position) && !jobbra.includes(position) && !keret.includes(position)) {
        console.log("belepek")
        lepes(position)
    }
})
selected = document.querySelector("#playerNumber")
selected.addEventListener('input',function (e) {
    kincsSzam = document.querySelector("#kincsSzam")
    kincsSzam.max = 24/selected.value
})


