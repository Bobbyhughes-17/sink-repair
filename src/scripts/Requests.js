import { fetchRequests, getRequests, deleteRequest, saveCompletion } from "./dataAccess.js";
import { plumbersDropdown } from "./plumbers.js";

export const Requests = () => {
  fetchRequests();

  const requests = getRequests();

  const requestListHtml = requests.map(convertRequestToListElement).join("");

  const html = `
    <ul>
      ${requestListHtml}
    </ul>
  `;

  return html;
};

function convertRequestToListElement(request) {
    
  return ` <li>
  <div>
  ${request.description}
  </div>
  <div class="plumbers">
  ${plumbersDropdown(request)}
  </div>
  <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
  </li>`;
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                  
            */
            const completion = {
                requestId: requestId,
                plumberId: plumberId,
                date_created: `${Date.now()}`
             }

             saveCompletion(completion)
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)


