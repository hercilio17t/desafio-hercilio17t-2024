class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: ['macaco', 'macaco', 'macaco'] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: ['gazela'] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: ['leão'] }
        ]

        this.biomasViaveis = {
            'leão': ['savana'],
            'leopardo': ['savana'],
            'crocodilo': ['rio'],
            'macaco': ['savana', 'floresta'],
            'gazela': ['savana'],
            'hipopotamo': ['savana e rio']
        }

        this.animalSizes = {
            'leão': 3,
            'leopardo': 2,
            'crocodilo': 3,
            'macaco': 1,
            'gazela': 2,
            'hipopotamo': 4
        }

        this.animaisCarnivoros = ['leão', 'leopardo', 'crocodilo']
    }
    analisaRecintos(animal, quantidade) {
        //4 - Verificar se o animal é válido
        if (!this.animalSizes[animal.toLowerCase()]) {
            return { erro: "Animal inválido" }
        }

        //5 - Verificar se a quantidade é válida
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" }
        }

        const tamanhoAnimal = this.animalSizes[animal.toLowerCase()]
        const biomasAceitos = this.biomasViaveis[animal.toLowerCase()]
        let recintosViaveis = []

        for (let recinto of this.recintos) {
            //Verificar se o bioma é compatível
            if (biomasAceitos.includes(recinto.bioma)) {
                let espacoOcupado = recinto.animais.reduce((total, animalExistente) => total + this.animalSizes[animalExistente], 0)
                let espacoNecessario = quantidade * tamanhoAnimal

                //Regra 6: Quando há mais de uma espécie, adicionar 1 espaço extra
                if (recinto.animais.length > 0 && !recinto.animais.includes(animal)) {
                    espacoNecessario += 1
                }

                //Verificar se o espaço é suficiente
                if (recinto.tamanho >= espacoOcupado + espacoNecessario) {
                    //Regra 2: Carnívoros só podem ficar com a mesma espécie
                    if (this.animaisCarnivoros.includes(animal.toLowerCase()) && recinto.animais.length > 0 && !recinto.animais.includes(animal)) {
                        continue
                    }

                    //Regra 3: Animais já presentes devem continuar confortáveis
                    let novoEspacoOcupado = espacoOcupado + espacoNecessario
                    if (novoEspacoOcupado <= recinto.tamanho) {
                        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanho - novoEspacoOcupado} total: ${recinto.tamanho})`)
                    }
                }
            }
        }

        //6 - Se nenhum recinto for viável, retornar erro
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" }
        }

        return { recintosViaveis }
    }
}

export { RecintosZoo }
