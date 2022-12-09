

const headers = {
    method: 'GET'
}

export async function getRecommendations(ingreds, numRecipes){
    const numString = numRecipes.toString()
    let ingrediantsString = ''

    for(const x in ingreds){
        if(x == ingreds.length-1){
            ingrediantsString += `${ingreds[x]}`    
        } else {
            ingrediantsString +=`${ingreds[x]},`
        }
    }
    
    const recommendationEngineURL = `https://cloud-recommender-gb4f5pbo5a-wn.a.run.app/recommend?ingrediants=${ingrediantsString}&num=${numString}`

    const res = await fetch(recommendationEngineURL, {method: 'GET'})

    const jsonResponse = await res.json()

    let recipes = [];
    Object.entries(jsonResponse).forEach((entry) => {
        recipes.push(entry)
    })

    let cleanedRecipes = []
    for(const recipe of recipes){

        let ingredients = []
        for(const ingredient of recipe[1].ingredients){            
            const stripped = ingredient.replace('ADVERTISEMENT','')
            if(stripped != ""){
                ingredients.push(ingredient.replace('ADVERTISEMENT',''))
            }
        }

        const temp = {
            title: recipe[1].title,
            instructions: recipe[1].instructions,
            ingredients: ingredients

        }
        cleanedRecipes.push(temp)
    }

    return cleanedRecipes;
}