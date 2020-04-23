let leagueChampsObj
const champList = []
const champImages = []
const champTypes = []

// Play music on page load
$.ajax({
    url: "https://ddragon.leagueoflegends.com/cdn/10.2.1/data/en_US/champion.json",
    method: "GET"
}).then(function (data) {
    //push JSON objects to array
    leagueChampsObj = data.data;
    for (const champName in leagueChampsObj) {
        champList.push(leagueChampsObj[champName])
    }

    //push champ image urls to array
    for (let i = 0; i < champList.length; i++) {
        champImages.push(`http://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${champList[i].image.full}`)
    }

    //append champ image array as img to the page
    for (let i = 0; i < champImages.length; i++) {
        $('#champ-gallery').append(`<img src="${champImages[i]}" alt="" id="${[i]}" class="All ${champList[i].tags.join(" ")}" width="60px">`)
        // add tags to each of the images as classes
    }
}).catch(console.error)


// Uncheck individual positions when all is clicked
$('#all').on('click', function () {
    $('#assassin, #fighter, #mage, #marksman, #support, #tank').prop('checked', false)
})


// Uncheck All option when an individual position is clicked
$('#assassin, #fighter, #mage, #marksman, #support, #tank').on('click', function () {
    $('#all').prop('checked', false)
})



$('#champ-type').on("click", function () {
    $('img').hide()
    const filters = [];
    $(this).find('input').each(function (i, element) {
        const isChecked = $(element).prop('checked')
        if (isChecked) {
            filters.push('.' + $(element).val())
        }
    })

    $(filters.join(', ')).show()

})

$('#champ-gallery').on('mouseenter', 'img', function () {
    $('.rating').attr('style', 'display: flex')
    $('.rating input').removeClass('checked')
    $('#champ-gallery img').removeClass('hover')
    $(this).addClass('hover')

    // Name
    $('#champ-detail h2').text(champList[$(this).attr('id')].name)

    // Title
    $('#champ-detail h3').text(champList[$(this).attr('id')].title)

    // Blurb
    $('#champ-detail p').text(champList[$(this).attr('id')].blurb)

    // Attack
    $('#attack').text('Attack: ' + champList[$(this).attr('id')].info.attack)

    // Defense
    $('#defense').text('Defense: ' + champList[$(this).attr('id')].info.defense)

    // Magic
    $('#magic').text('Magic: ' + champList[$(this).attr('id')].info.magic)

    // Difficulty
    $('#difficulty').text('Difficulty: ' + champList[$(this).attr('id')].info.difficulty)

    // Difficulty Bar
    $(`#rata${champList[$(this).attr('id')].info.difficulty}`).addClass("checked")

})

// $('#champ-gallery').on('click', 'img', function () {
//     $(this).attr('id')
// })

