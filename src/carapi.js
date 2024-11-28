export function fetchCars() {
  return fetch(import.meta.env.VITE_API_URL).then((response) => {
    if (!response.ok) {
      throw new Error("Something wrong with response!" + response.statusText);
    }
    return response.json();
  });
}

export function deleteCar(url) {
  return fetch(url, { method: "DELETE" }).then((response) => {
    if (!response.ok) {
      throw new Error("Something wrong with response!" + response.statusText);
    }
    return response.json();
  });
}

export function saveCar(newCar) {
  return fetch(import.meta.env.VITE_API_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newCar),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in saving: " + response.statusText);

    return response.json();
  });
}

export function updateCar(url, updatedCar) {
  return fetch(url, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(updatedCar),
  }).then((response) => {
    if (!response.ok)
      throw new Error("Error in update: " + response.statusText);

    return response.json();
  });
}
