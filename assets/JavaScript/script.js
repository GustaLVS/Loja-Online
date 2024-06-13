if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    const remover = document.getElementsByClassName("remove");
    for (var i = 0; i < remover.length; i++) {
        remover[i].addEventListener("click", removerproduto);
    }

    const inputQuant = document.getElementsByClassName("quant");
    for (var i = 0; inputQuant.length; i++) {
        inputQuant[i].addEventListener("change", AtualizarValor);
    }
}

function removerproduto(event) {
    event.target.parentElement.remove();
    AtualizarValor();
}

function AtualizarValor() {
    let ValTot = 0;
    const Product = document.getElementsByClassName("infoCar");
    for (var i = 0; i < Product.length; i++) {
        const price = Product[i]
            .getElementsByClassName("preco")[0]
            .innerText.replace("R$", "")
            .replace(",", ".");
        const Quanti = Product[i].getElementsByClassName("quant")[0].value;

        ValTot = ValTot + price * Quanti;
    }
    ValTot = ValTot.toFixed(2).replace(".", ",");
    document.querySelector(".total span").innerText = ValTot;
}
AtualizarValor();
