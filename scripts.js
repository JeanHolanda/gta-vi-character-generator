const luciaButton = document.querySelector('#lucia-button')
const jasonButton = document.querySelector('#jason-button')
const cjButton = document.querySelector('#cj-button')
const youButton = document.querySelector('#you-button')

function changePersonage(name, color, src) {

    const namePersonage = document.querySelector('.name')
    const personageImage = document.querySelector('.personage-image')

    namePersonage.innerHTML = name
    namePersonage.style.color = color
    personageImage.src = src
}

function yourPersonage(photo) {

    const onloadText = document.querySelector('.select-your-personage')
    onloadText.innerHTML = 'A IA está te desenhando...🎨'

    youButton.style.pointerEvents = 'none'
    youButton.style.opacity = '0.5'

    let leitor = new FileReader()
    leitor.readAsDataURL(photo.files[0])
    leitor.onload = async function () {
        try {
            let generatedPhoto = await puter.ai.txt2img("Transforme a pessoa desta foto em um personagem de videogame: contorno preto grosso, cores vivas, meio corpo, mantendo o rosto parecido. Fundo totalmente transparente: sem cenário, sem chão e sem sombra.",
                {
                    model: 'replicate:openai/gpt-image-2.5-flare',
                    provider: 'openai',
                    input_image: leitor.result,
                    quality: 'medium',
                    providerOptions: { background: "transparent" }
                })

            changePersonage('Você', '#d8d51a', generatedPhoto.src)
        }
        catch (err) {
            alert('Não foi possível gerar seu personagem. Tente novamente')
        }
        onloadText.innerHTML = 'Selecione seu personagem'

        youButton.style.pointerEvents = 'auto'
        youButton.style.opacity = '1'
    }
}

luciaButton.addEventListener('click', (() => changePersonage('lucia', '#eb1890', './img/lucia.png')))
jasonButton.addEventListener('click', (() => changePersonage('jason', '#2ecafe', './img/jason.png')))
cjButton.addEventListener('click', (() => changePersonage('cj', '#00FA9A', './img/cj.png')))