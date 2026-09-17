const botao = document.getElementById("calcular");

const fck = document.getElementById("fck");
const slump = document.getElementById("slump");
const brita = document.getElementById("brita");
const cimento = document.getElementById("cimento");
const massaCimento = document.getElementById("massaCimento");
const volume = document.getElementById("volume");
const massaAreia = document.getElementById("massaAreia");
const massaBrita = document.getElementById("massaBrita");
const teorArgamassa = document.getElementById("teorArgamassa");

const curvaReferencia = [
    { fck: 20, ac: 0.64 },
    { fck: 30, ac: 0.53 },
    { fck: 40, ac: 0.42 },
];   

    function encontrarAc(fckInformado) {
        for (let i = 0; i < curvaReferencia.length - 1; i++) {
            const ponto1 = curvaReferencia[i];
            const ponto2 = curvaReferencia[i + 1];

                if (fckInformado >= ponto1.fck && fckInformado <= ponto2.fck) {
                    const ac = ponto1.ac +
                        (fckInformado - ponto1.fck) *
                        (ponto2.ac - ponto1.ac) /
                        (ponto2.fck - ponto1.fck);
                    return ac;
                }
        }
        return null;
    }


botao.addEventListener("click", function() {
    const valorFck = Number(fck.value);
        if (fck.value === "") {
            alert("Por favor, preencha o fck.");
            return;
        }
    
    const valorRelacaoAc = encontrarAc(valorFck);
        if (valorRelacaoAc === null) {
            alert ("O FCK informado está fora da curva de referência.");
            return;
        }
    console.log (valorRelacaoAc);

    const valorSlump = Number(slump.value);
         if (slump.value === "") {
            alert("Por favor, preencha o Slump.");
            return;
        }

    const valorBrita = Number(brita.value);
         if (brita.value === "") {
            alert("Por favor, preencha a dimensão da brita.");
            return;
        }
    const valorCimento = cimento.value;
         if (cimento.value === "") {
            alert("Por favor, preencha o cimento.");
            return;
        }

    const valorMassaCimento = Number(massaCimento.value);
        if (massaCimento.value === "")  {
            alert("Por favor, preencha a massa específica do cimento");
            return;
        }


    const valorMassaAreia = Number(massaAreia.value);
        if (massaAreia.value === "") {
            alert("Por favor, preencha a massa específica da areia.");
            return;
        }

    const valorMassaBrita = Number(massaBrita.value);
        if (massaBrita.value === "") {
            alert("Por favor, preencha a massa específica da brita.");
            return;
        }

    const valorVolume = Number(volume.value);
         if (volume.value === "") {
            alert("Por favor, preencha o volume.");
            return;
        }
    

    const valorTeorArgamassa = Number(teorArgamassa.value);
        if (teorArgamassa.value === "") {
            alert("Por favor, preencha o teor de argamassa");
            return;
        }



    console.log(valorFck)
    console.log(valorSlump)
    console.log(valorBrita)
    console.log(valorCimento)
    console.log(valorMassaCimento)
    console.log(valorMassaAreia)
    console.log(valorMassaBrita)
    console.log(valorVolume)
    console.log(valorTeorArgamassa)
    
});