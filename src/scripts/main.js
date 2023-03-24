import { fetchRequests, fetchPlumbers, setMainContainer, fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

setMainContainer(mainContainer)

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()
    
    mainContainer.addEventListener(
        "stateChanged",
        customEvent => {
            render()
        }
    )