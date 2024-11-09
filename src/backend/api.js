
import { getDataFromTechForPalestine } from "./dataforpalestine"


export function getInitialData () {
  return Promise.all([
    getDataFromTechForPalestine()
  ]).then(([data]) => ({
    data
  }))
}




