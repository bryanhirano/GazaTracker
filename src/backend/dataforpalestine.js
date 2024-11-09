export async function getDataFromTechForPalestine(){
    try{
        let response = await fetch('https://data.techforpalestine.org/api/v2/casualties_daily.json')
        let responseJson = await response.json()
        return responseJson
    }
    catch(error){
        console.error(error)
    }
}