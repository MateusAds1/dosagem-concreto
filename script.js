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
const resultadoFCK = document.getElementById("resultadoFCK");
const resultadoAC = document.getElementById("resultadoAC");
const resultadoCimento = document.getElementById("resultadoCimento");
const resultadoAgua = document.getElementById("resultadoAgua");
const resultadoAreia = document.getElementById("resultadoAreia");
const resultadoBrita = document.getElementById("resultadoBrita");
const resultadoTraco = document.getElementById("resultadoTraco");
const resultadoCimentoVolume = document.getElementById("resultadoCimentoVolume");
const resultadoAreiaVolume = document.getElementById("resultadoAreiaVolume");
const resultadoBritaVolume = document.getElementById("resultadoBritaVolume");

const curvaReferencia = [
    { fck: 20, ac: 0.64, cimento: 295 },
    { fck: 30, ac: 0.53, cimento: 367 },
    { fck: 40, ac: 0.42, cimento: 488 },
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

    function encontrarCimento(fckInformado) {
        for (let i = 0; i < curvaReferencia.length - 1; i++) {
            const ponto1 = curvaReferencia[i];
            const ponto2 = curvaReferencia[i + 1];
                if (fckInformado >= ponto1.fck && fckInformado <= ponto2.fck) {
                    
                    const cimento = ponto1.cimento +
                    (fckInformado - ponto1.fck) *
                    (ponto2.cimento - ponto1.cimento) /
                    (ponto2.fck - ponto1.fck);

                return cimento;
                }
        }
        return null
    }


botao.addEventListener("click", function() {
    const valorFck = Number(fck.value);
        if (fck.value === "") {
            alert("Por favor, preencha o fck.");
            return;
        }
    resultadoFCK.textContent = "FCK informado: " + valorFck + "MPa";
    
    const valorRelacaoAc = encontrarAc(valorFck);
        if (valorRelacaoAc === null) {
            alert ("O FCK informado está fora da curva de referência.");
            return;
        }
    resultadoAC.textContent = "Relação A/C: " + valorRelacaoAc.toFixed(3);
    console.log (valorRelacaoAc);

    const valorCimentoKg = encontrarCimento(valorFck);

    console.log("A/C:", valorRelacaoAc)
    console.log("Cimento:", valorCimentoKg);
        resultadoCimento.textContent = "Cimento: " + valorCimentoKg.toFixed(2) + " kg/m³";

        const valorMassaCimento = Number(massaCimento.value);
        if (massaCimento.value === "")  {
            alert("Por favor, preencha a massa específica do cimento");
            return;
        }

        const volumeCimento = valorCimentoKg / valorMassaCimento;
        console.log("Volume do cimento:", volumeCimento);

    const valorAgua = valorRelacaoAc * valorCimentoKg;
    console.log("Água:", valorAgua);
        resultadoAgua.textContent = "Água: " + valorAgua.toFixed(2) + " L/m³";
        const tracoAgua = valorRelacaoAc;
        console.log("Traço da água:", tracoAgua.toFixed(3));

        const volumeAgua = valorAgua / 1000;
        console.log("Volume da água:", volumeAgua)

        const volumeAgregados = 1 - volumeCimento / 1000 - volumeAgua;
        console.log("Volume dos agregados:", volumeAgregados);

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

    const cimentoParaVolume = valorCimentoKg * valorVolume;
    console.log("Cimento para o volume:", cimentoParaVolume);
        resultadoCimentoVolume.textContent = 
        "Cimento para " + valorVolume + " m³: " +
        cimentoParaVolume.toFixed(2) + " kg";

    
    const valorTeorArgamassa = Number(teorArgamassa.value);
        if (teorArgamassa.value === "") {
            alert("Por favor, preencha o teor de argamassa");
            return;
        }

    const volumeArgamassa = 1 * (valorTeorArgamassa / 100);
    console.log("Volume da argamassa:", volumeArgamassa);

    const volumeAreia = volumeArgamassa - (volumeCimento / 1000) - volumeAgua;
    console.log("Volume da areia:", volumeAreia);

    const massaAreiaKg = volumeAreia * (valorMassaAreia * 1000)
    console.log("Massa da areia:", massaAreiaKg)
        resultadoAreia.textContent = "Areia: " + massaAreiaKg.toFixed(2) + " kg/m³";

    const areiaParaVolume = massaAreiaKg * valorVolume;
    console.log("Areia para o volume:", areiaParaVolume);
        resultadoAreiaVolume.textContent = 
        "Areia para " + valorVolume + " m³ : " +
        areiaParaVolume.toFixed(2) + " kg";

    const tracoAreia = massaAreiaKg / valorCimentoKg;
    console.log("Traço da areia:", tracoAreia);
    console.log("Traço da areia:", tracoAreia.toFixed(2));

    const volumeBrita = volumeAgregados - volumeAreia;
    console.log("Volume da brita:", volumeBrita)

    const massaBritaKg = volumeBrita * (valorMassaBrita * 1000);
    console.log("Massa da brita:", massaBritaKg)
        resultadoBrita.textContent = "Brita: " + massaBritaKg.toFixed(2) + " kg/m³";

    const britaParaVolume = massaBritaKg * valorVolume;
    console.log("Brita para o volume:", britaParaVolume.toFixed(2));
        resultadoBritaVolume.textContent =
        "Brita para " + valorVolume + " m³ :" +
        britaParaVolume.toFixed(2) + " kg";

    const tracoBrita = massaBritaKg / valorCimentoKg;
    console.log("Traço da brita:", tracoBrita);
    console.log("Traço da brita:", tracoBrita.toFixed(2))

    resultadoTraco.textContent = 
        "Traço: 1 : " +
        tracoAreia.toFixed(2) +
        " : " + 
        tracoBrita.toFixed(2) +
        " : " + 
        tracoAgua.toFixed(3);
    
        
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