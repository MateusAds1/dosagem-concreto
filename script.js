// LIGAÇAO COM HTML //

const botao = document.getElementById("calcular");
const fck = document.getElementById("fck");
const slump = document.getElementById("slump");
const brita = document.getElementById("brita");
const cimento = document.getElementById("cimento");
const massaCimento = document.getElementById("massaCimento");
const volume = document.getElementById("volume");
const massaAreia = document.getElementById("massaAreia");
const tipoAreia1 = document.getElementById("tipoAreia1");
const porcentagemAreia1 = document.getElementById("porcentagemAreia1");
const tipoAreia2 = document.getElementById("tipoAreia2");
const porcentagemAreia2 = document.getElementById("porcentagemAreia2");
const massaBrita = document.getElementById("massaBrita");
const teorArgamassa = document.getElementById("teorArgamassa");
const tipoBrita1 = document.getElementById("tipoBrita1");
const porcentagemBrita1 = document.getElementById("porcentagemBrita1");
const tipoBrita2 = document.getElementById("tipoBrita2");
const porcentagemBrita2 = document.getElementById("porcentagemBrita2");
const resultadoFCK = document.getElementById("resultadoFCK");
const resultadoAC = document.getElementById("resultadoAC");
const resultadoCimento = document.getElementById("resultadoCimento");
const resultadoAgua = document.getElementById("resultadoAgua");
const resultadoAreia = document.getElementById("resultadoAreia");
const resultadoAreia1Volume = document.getElementById("resultadoAreia1Volume");
const resultadoAreia2Volume = document.getElementById("resultadoAreia2Volume");
const resultadoAreia2 = document.getElementById("resultadoAreia2");
const resultadoBrita = document.getElementById("resultadoBrita");
const resultadoBrita1 = document.getElementById("resultadoBrita1");
const resultadoBrita2 = document.getElementById("resultadoBrita2");
const resultadoTraco = document.getElementById("resultadoTraco");
const resultadoCimentoVolume = document.getElementById("resultadoCimentoVolume");
const resultadoAreiaVolume = document.getElementById("resultadoAreiaVolume");
const resultadoBritaVolume = document.getElementById("resultadoBritaVolume");
const resultadoBrita1Volume = document.getElementById("resultadoBrita1Volume");
const resultadoBrita2Volume = document.getElementById("resultadoBrita2Volume");
const resultadoAguaVolume = document.getElementById("resultadoAguaVolume");

//  //

// CURVA DE REFÊNCIA //
const curvaReferencia = [
    { fck: 20, ac: 0.64, cimento: 295 },
    { fck: 30, ac: 0.53, cimento: 367 },
    { fck: 40, ac: 0.42, cimento: 488 },
];   
//  //

// FUNÇOES DE CALCULOS //
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
//  //

botao.addEventListener("click", function() {
    
// VALIDAÇÃO DAS INFORMAÇÕES//    
    const valorFck = Number(fck.value);
        if (fck.value === "") {
            alert("Por favor, preencha o fck.");
            return;
        }

    if (slump.value === "") {
        alert("Por favor, preencha o Slump.");
        return;
    }

    if (brita.value === "") {
        alert("Por favor, preencha a dimensão da brita.");
        return;
    }

    const valorBrita = Number(brita.value);
    if (valorBrita !== 9.5 &&
        valorBrita !== 19 &&
        valorBrita !== 25 &&
        valorBrita !== 32 &&
        valorBrita !== 38) {

        alert("A dimensão da brita deve ser 9,5, 19, 25, 32 ou 38 mm.");
        return;
    }


    if (cimento.value === "") {
        alert("Por favor, preencha o cimento.");
        return;
    }

    if (massaCimento.value === "") {
        alert("Por favor, preencha a massa específica do cimento.");
        return;
    }

    if (massaAreia.value === "") {
        alert("Por favor, preencha a massa específica da areia.");
        return;
    }

    if (massaBrita.value === "") {
        alert("Por favor, preencha a massa específica da brita.");
        return;
    }

    if (volume.value === "") {
        alert("Por favor, preencha o volume.");
        return;
    }

     if (teorArgamassa.value === "") {
        alert("Por favor, preencha o teor de argamassa.");
        return;
    }

    if (porcentagemAreia1.value === "" || porcentagemAreia2.value === "") {
        alert("Por favor, informe as porcentagens das areias.");
        return;
    }

    const valorPorcentagemAreia1 = Number(porcentagemAreia1.value);
    const valorPorcentagemAreia2 = Number(porcentagemAreia2.value);

    if (valorPorcentagemAreia1 + valorPorcentagemAreia2 !== 100) {
        alert("A porcentagem das areias deve totalizar 100%.");
        return;
    }

     if (porcentagemBrita1.value === "" || porcentagemBrita2.value === "") {
        alert("Por favor, informe as porcentagens das Britas.");
        return;
    }

    const valorPorcentagemBrita1 = Number(porcentagemBrita1.value);
    const valorPorcentagemBrita2 = Number(porcentagemBrita2.value);

    if (valorPorcentagemBrita1 + valorPorcentagemBrita2 !== 100) {
        alert("A porcentagem das britas deve totalizar 100%.");
        return;
    }
//  //

// CÁLCULO DA DOSAGEM //
   
    // RELAÇAO A/C, COM BASE FCK //
    resultadoFCK.textContent = "FCK informado: " + valorFck + " MPa";
    
    const valorRelacaoAc = encontrarAc(valorFck);
        if (valorRelacaoAc === null) {
            alert ("O FCK informado está fora da curva de referência.");
            return;
        }
    resultadoAC.textContent = "Relação A/C: " + valorRelacaoAc.toFixed(3).replace(".", ",");
    console.log (valorRelacaoAc);
    //  //

    // CONSUMO CIMENTO //
    const valorCimentoKg = encontrarCimento(valorFck);

    const valorTeorArgamassa = Number(teorArgamassa.value) / 100;

    console.log("A/C:", valorRelacaoAc)
    console.log("Cimento:", valorCimentoKg);

        const valorM = (2400 / valorCimentoKg) - 1 - valorRelacaoAc;
        console.log("m:", valorM)

        const valorA = valorTeorArgamassa * (1 + valorM) - 1
        console.log("a (areia):", valorA);

        const valorB = valorM - valorA;
        console.log("b (brita):", valorB)

        resultadoCimento.textContent = "Cimento: " + valorCimentoKg.toFixed(2).replace(".", ",") + " kg/m³";

        const valorMassaCimento = Number(massaCimento.value);

        const volumeCimento = valorCimentoKg / valorMassaCimento;
        console.log("Volume do cimento:", volumeCimento);
    // //

    // CÁLCULO DA ÁGUA //
    const valorAgua = valorRelacaoAc * valorCimentoKg;
    console.log("Água:", valorAgua);
        resultadoAgua.textContent = "Água: " + valorAgua.toFixed(2).replace(".", ",") + " L/m³";
        const tracoAgua = valorRelacaoAc;
        console.log("Traço da água:", tracoAgua.toFixed(3));

        const volumeAgua = valorAgua / 1000;
        console.log("Volume da água:", volumeAgua)

        const volumeAgregados = 1 - volumeCimento / 1000 - volumeAgua;
        console.log("Volume dos agregados:", volumeAgregados);
    //  //

// CONVERSÃO DOS VALORES PARA NÚMERO //

    const valorCimento = cimento.value;
    const valorMassaAreia = Number(massaAreia.value);
    const valorMassaBrita = Number(massaBrita.value);
    const valorVolume = Number(volume.value);
    const percentualAreia1 = valorPorcentagemAreia1 / 100;
    const percentualAreia2 = valorPorcentagemAreia2 / 100;

// //

// CALCULOS AREIAS //
       


//   //

    // QUANTIDADES DE ACORDO COM O VOLUME //
    const aguaParaVolume = valorAgua * valorVolume;
        resultadoAguaVolume.textContent =
        "Água para " + valorVolume + " m³: " +
        aguaParaVolume.toFixed(2).replace(".", ",") + " L";

    const cimentoParaVolume = valorCimentoKg * valorVolume;
    console.log("Cimento para o volume:", cimentoParaVolume);
        resultadoCimentoVolume.textContent = 
        "Cimento para " + valorVolume + " m³: " +
        cimentoParaVolume.toFixed(2).replace(".", ",") + " kg";

    // //

    // CÁLCULO AREIA //
    const massaAreiaKg = valorA * valorCimentoKg;
        console.log("Massa da areia:",massaAreiaKg);
        resultadoAreia.textContent =
        "Total de Areia: " +
        massaAreiaKg.toFixed(2).replace(".", ",") +
        " kg/m³";

    const areiaParaVolume = massaAreiaKg * valorVolume;
    console.log("Areia para o volume:", areiaParaVolume);
        resultadoAreiaVolume.textContent = 
        "Areia para " + valorVolume + " m³: " +
        areiaParaVolume.toFixed(2).replace(".", ",") + " kg";

    const massaAreia1Kg = massaAreiaKg * percentualAreia1;
    console.log("Massa da areia 1:", massaAreia1Kg);
        resultadoAreia1.textContent =
        tipoAreia1.value + ": " +
        massaAreia1Kg.toFixed(2).replace(".", ",") 

    resultadoAreia1.textContent = 
    tipoAreia1.value + ": " +
    massaAreia1Kg.toFixed(2).replace(".", ",") +
    " kg/m³";

    const massaAreia2Kg = massaAreiaKg * percentualAreia2
    console.log("Massa da areia 2:", massaAreia2Kg)
        resultadoAreia2.textContent = 
        tipoAreia2.value + ": " +
        massaAreia2Kg.toFixed(2).replace(".", ",") +
        " kg/m³";

    const areia1ParaVolume = massaAreia1Kg * valorVolume;
    const areia2ParaVolume = massaAreia2Kg * valorVolume;

    resultadoAreia1Volume.textContent = tipoAreia1.value + " para " + valorVolume + " m³: " +
    areia1ParaVolume.toFixed(2).replace(".", ",") + (" kg")

    resultadoAreia2Volume.textContent = tipoAreia2.value + " para " + valorVolume + " m³: " +
    areia2ParaVolume.toFixed(2).replace(".", ",") + (" kg")

    // //

    // CÁLCULO DA BRITA //
    const massaBritaKg = valorB * valorCimentoKg;
    console.log("Massa da brita:", massaBritaKg)
        resultadoBrita.textContent = "Total de Brita: " + massaBritaKg.toFixed(2).replace(".",",") + " kg/m³";

    const percentualBrita1 = valorPorcentagemBrita1 / 100;
    const percentualBrita2 = valorPorcentagemBrita2 / 100;

    const massaBrita1kg = massaBritaKg * percentualBrita1;
    const massaBrita2kg = massaBritaKg * percentualBrita2;

    console.log("Massa da brita 1:", massaBrita1kg);
    console.log("Massa da brita 2:", massaBrita2kg);

    resultadoBrita1.textContent = tipoBrita1.value + ": " +
    massaBrita1kg.toFixed(2).replace(".", ",") + " kg/m³"
    
    resultadoBrita2.textContent = tipoBrita2.value + ": " +
    massaBrita2kg.toFixed(2).replace(".", ",") + " kg/m³"
        
    const britaParaVolume = massaBritaKg * valorVolume;
    console.log("Brita para o volume:", britaParaVolume.toFixed(2));
        resultadoBritaVolume.textContent =
        "Brita para " + valorVolume + " m³: " +
        britaParaVolume.toFixed(2).replace(".", ",") + " kg";

    const brita1ParaVolume = massaBrita1kg * valorVolume;
    const brita2ParaVolume = massaBrita2kg * valorVolume;

    resultadoBrita1Volume.textContent = tipoBrita1.value + " para " + valorVolume + " m³: " +
    brita1ParaVolume.toFixed(2).replace(".", ",") + " kg";

    resultadoBrita2Volume.textContent = tipoBrita2.value + " para " + valorVolume + " m³: " +
    brita2ParaVolume.toFixed(2).replace(".", ",") + " kg";

    //  //

    // CÁLCULO DO TRAÇO //
    const tracoBrita = massaBritaKg / valorCimentoKg;
    console.log("Traço da brita:", tracoBrita);
    console.log("Traço da brita:", tracoBrita.toFixed(2))

    resultadoTraco.textContent = 
        "Traço: 1 : " +
        valorA.toFixed(2).replace(".",",") +
        " : " + 
        tracoBrita.toFixed(2).replace(".",",") +
        " : " + 
        tracoAgua.toFixed(3).replace(".",",");
    // //
    
    // VALORES INFORMADOS PELO USUARIO //
    console.log(valorFck)
    console.log(valorBrita)
    console.log(valorCimento)
    console.log(valorMassaCimento)
    console.log(valorMassaAreia)
    console.log(valorMassaBrita)
    console.log(valorVolume)
    console.log(valorTeorArgamassa)
    // //
    
});