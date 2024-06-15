if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    const remover = document.getElementsByClassName("remove");
    for (var i = 0; i < remover.length; i++) {
        remover[i].addEventListener("click", removerProduto);
    }

    const inputQuant = document.getElementsByClassName("quant");
    for (var i = 0; i < inputQuant.length; i++) {
        inputQuant[i].addEventListener("change", atualizarValor);
    }

    const AddtoCar = document.getElementsByClassName("ButAdd");
    for (var i = 0; i < AddtoCar.length; i++) {
        AddtoCar[i].addEventListener("click", adicionarProduto);
    }
}

function adicionarProduto(event) {
    const button = event.target;
    const infoProd = button.parentElement;
    const imgProd = infoProd.getElementsByClassName("Img-prod")[0].src;
    const titleProd = infoProd.getElementsByClassName("title-prod")[0].innerText;
    const priceProd = infoProd.getElementsByClassName("PrecoProd")[0].innerText;

    // Verificar se o produto já está no carrinho
    const cartItems = document.getElementsByClassName("infoCar");
    for (let i = 0; i < cartItems.length; i++) {
        const title = cartItems[i].getElementsByClassName("nome")[0].innerText;
        if (title === titleProd) {
            // Se já estiver no carrinho, aumentar a quantidade
            const inputQuantidade = cartItems[i].getElementsByClassName("quant")[0];
            const novaQuantidade = parseInt(inputQuantidade.value) + 1;
            inputQuantidade.value = novaQuantidade;
            // Atualizar o valor total
            atualizarValor();
            return; // Encerrar a função aqui pois o produto já está no carrinho
        }
    }

    // Caso o produto não esteja no carrinho, adicionar normalmente
    let carElem = document.createElement("div");
    carElem.classList.add("infoCar");

    carElem.innerHTML = `
        <img src="${imgProd}" id="imgCar"/>
        <span class="nome">${titleProd}</span>
        <span class="preco">${priceProd}</span>
        <input type="number" value="1" min="1" class="quant" />
        <button class="remove">Remover</button>
    `;

    const carrinho = document.getElementsByClassName('carrinho')[0];
    carrinho.append(carElem);

    carElem.getElementsByClassName("remove")[0].addEventListener("click", removerProduto);
    carElem.getElementsByClassName("quant")[0].addEventListener("change", atualizarValor);

    // Atualizar o valor total
    atualizarValor();
}

function removerProduto(event) {
    event.target.parentElement.remove();
    // Atualizar o valor total
    atualizarValor();
}

function atualizarValor() {
    let valTot = 0;
    const products = document.getElementsByClassName("infoCar");
    for (let i = 0; i < products.length; i++) {
        const price = parseFloat(
            products[i].getElementsByClassName("preco")[0].innerText.replace("R$", "").replace(",", ".")
        );
        const quantidade = products[i].getElementsByClassName("quant")[0].value;
        valTot += price * quantidade;
    }
    valTot = valTot.toFixed(2).replace(".", ",");
    document.querySelector(".PreTotal").innerText = "R$ " + valTot;
}
